import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
    Review,
    getBookTreePostType,
    ReviewJoinedUser,
    UserInfo,
    PostReview
} from './types'
import { validateReview, generateToken, fetchBookFromRakutenAPI } from './util'

admin.initializeApp()
const dbType = admin.firestore
const db = admin.firestore()

export const userOnCreate = functions.auth.user().onCreate(async (user) => {
    await db.runTransaction(async (transaction) => {
        transaction.set(db.collection('users').doc(user.uid), {
            uid: user.uid,
            profileImage: user.photoURL,
            displayName: user.displayName,
            gratePartList: [null, null, null],
            createdAt: dbType.FieldValue.serverTimestamp()
        })

        transaction.set(db.collection('_users').doc(user.uid), {
            uid: user.uid,
            email: user.email
        })
    })
})

// ユーザー削除時にレビューとユーザー削除を削除
export const userOnDelete = functions.auth.user().onDelete(async (user) => {
    await db.runTransaction(async (transaction) => {
        const querySnapshotReview = await transaction.get(
            db.collection('reviews').where('uid', '==', user.uid)
        )
        const querySnapshotFrom = await transaction.get(
            db
                .collection('invitations')
                .where('from', '==', user.uid)
                .where('accepted', '==', true)
        )
        const querySnapshotTo = await transaction.get(
            db
                .collection('invitations')
                .where('to', '==', user.uid)
                .where('accepted', '==', true)
        )
        const fromDoc = querySnapshotFrom.docs
        const toDoc = querySnapshotTo.docs
        const invitationDocs = fromDoc.concat(toDoc)

        transaction.delete(db.collection('users').doc(user.uid))
        transaction.delete(db.collection('_users').doc(user.uid))
        querySnapshotReview.forEach((res) => {
            transaction.delete(res.ref)
        })
        invitationDocs.forEach((res) => {
            transaction.delete(res.ref)
        })
    })
})

export const createInvitationCode = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'ログインをしてください'
            )
        }

        const specialty = data.specialty || null
        if (!specialty) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                '「～がすごいひと」を入力してください。'
            )
        }

        const token = await generateToken()

        if (token) {
            const invitationURL = `http://localhost:3000/invite/?token=${token}`
            const invitationsRef = db.collection('invitations')
            invitationsRef.add({
                to: null,
                from: context.auth?.uid,
                token: token,
                accepted: false,
                specialty: specialty,
                createdAt: dbType.FieldValue.serverTimestamp(),
                acceptedAt: null
            })
            return invitationURL
        } else {
            throw new functions.https.HttpsError(
                'aborted',
                'トークンの生成に失敗しました。'
            )
        }
    }
)

export const checkInvitationCode = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'ログインをしてください'
            )
        }
        const clientToken: string = data.token
        const querySnapshot = await db
            .collection('invitations')
            .where('token', '==', clientToken)
            .get()

        if (querySnapshot.size === 0) {
            throw new functions.https.HttpsError(
                'not-found',
                '招待が見つかりませんでした。'
            )
        } else if (querySnapshot.size >= 2) {
            throw new functions.https.HttpsError(
                'internal',
                'トークンが重複しています'
            )
        }

        const docData = querySnapshot.docs[0].data()

        if (docData.from === context.auth.uid) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                '別のユーザーが作成した招待のみ有効です。'
            )
        }

        if (docData.accepted === true) {
            throw new functions.https.HttpsError(
                'already-exists',
                '既に承認されています。'
            )
        }

        return docData
    }
)

export const createInvitationReview = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'ログインをしてください'
            )
        }
        const clientToken: string = data.token
        const querySnapshot = await db
            .collection('invitations')
            .where('token', '==', clientToken)
            .get()

        if (querySnapshot.size === 0) {
            throw new functions.https.HttpsError(
                'not-found',
                '招待が見つかりませんでした。'
            )
        } else if (querySnapshot.size >= 2) {
            throw new functions.https.HttpsError(
                'internal',
                'トークンが重複しています'
            )
        }

        const docData = querySnapshot.docs[0].data()

        if (docData.from === context.auth.uid) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                '別のユーザーが作成した招待のみ有効です。'
            )
        }

        if (docData.accepted === true) {
            throw new functions.https.HttpsError(
                'already-exists',
                '既に承認されています。'
            )
        }

        const postReviews: PostReview[] = data.postReviews
        if (!postReviews || postReviews === []) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'レビューが一つ以上必要です。'
            )
        }

        const docId = querySnapshot.docs[0].id

        await db.runTransaction(async (transaction) => {
            for (const postReview of postReviews) {
                validateReview(postReview)
                const bookData = await fetchBookFromRakutenAPI(postReview.isbn)
                if (!bookData) {
                    throw new functions.https.HttpsError(
                        'invalid-argument',
                        '無効なISBNです'
                    )
                }
                const review: Review = {
                    uid: context.auth?.uid as string, // ログインしているので必ずある
                    specialty: docData.specialty,
                    title: bookData.Item.title,
                    bookImageURL: bookData.Item.largeImageUrl,
                    bookLink: bookData.Item.itemUrl,
                    content: postReview.content,
                    reason: postReview.reason,
                    createdAt: dbType.FieldValue.serverTimestamp()
                }
                transaction.set(db.collection('reviews').doc(), review)
            }

            transaction.update(db.collection('invitations').doc(docId), {
                to: context.auth?.uid,
                accepted: true,
                acceptedAt: dbType.FieldValue.serverTimestamp()
            })
        })
        return 'success'
    }
)

export const getBookTree = functions.https.onCall(
    async (data: getBookTreePostType, context) => {
        const userID = data.uid
        if (!userID) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'userIDが必要です。'
            )
        }
        let userIDs: string[] = [userID]

        // 距離が１のユーザーを取得
        const isFrom = db
            .collection('invitations')
            .where('from', '==', userID)
            .where('accepted', '==', true)
            .get()
        const isTo = db
            .collection('invitations')
            .where('to', '==', userID)
            .where('accepted', '==', true)
            .get()
        const [querySnapshotFrom, querySnapshotTo] = await Promise.all([
            isFrom,
            isTo
        ])

        const fromDoc = querySnapshotFrom.docs
        const toDoc = querySnapshotTo.docs
        const invitationDocs = fromDoc.concat(toDoc)
        invitationDocs.forEach((res) => {
            const d = res.data()
            userIDs.push(d.to === userID ? d.from : d.to)
        })
        // 重複削除
        userIDs = Array.from(new Set(userIDs))

        const bookTree: ReviewJoinedUser[] = []

        const querySnapshotReview = await db
            .collection('reviews')
            .where('uid', 'in', userIDs)
            .get()
        const querySnapshotUser = await db
            .collection('users')
            .where('uid', 'in', userIDs)
            .get()
        querySnapshotReview.forEach((res) => {
            bookTree.push(<ReviewJoinedUser>res.data())
        })

        querySnapshotUser.forEach((res) => {
            const userInfo = <UserInfo>res.data()
            bookTree.forEach((review) => {
                if (review.uid == userInfo.uid) {
                    review.user = userInfo
                }
            })
        })

        return bookTree
    }
)

export const deleteBookTree = functions.https.onCall(async (data, context) => {
    if (context.auth?.uid === undefined) {
        throw new functions.https.HttpsError(
            'failed-precondition',
            'ログインをしてください'
        )
    }

    try {
        await admin.auth().deleteUser(context.auth?.uid)
    } catch (err) {
        throw new functions.https.HttpsError(
            'internal',
            'ユーザー削除に失敗しました。'
        )
    }
})

export const createReviewsIndividual = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'ログインをしてください'
            )
        }

        const postReviews: PostReview[] = data.postReviews
        if (postReviews.length === 0) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'レビューが一つ以上必要です。'
            )
        } else if (postReviews.length > 5) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                '一度に投稿できるレビューの数は5個までです。'
            )
        }

        await db.runTransaction(async (transaction) => {
            for (const postReview of postReviews) {
                validateReview(postReview)
                const bookData = await fetchBookFromRakutenAPI(postReview.isbn)
                if (!bookData) {
                    throw new functions.https.HttpsError(
                        'invalid-argument',
                        '無効なISBNです'
                    )
                }
                const review: Review = {
                    uid: context.auth?.uid as string, // ログインしているので必ずある
                    specialty: null,
                    title: bookData.Item.title,
                    bookImageURL: bookData.Item.largeImageUrl,
                    bookLink: bookData.Item.itemUrl,
                    content: postReview.content,
                    reason: postReview.reason,
                    createdAt: dbType.FieldValue.serverTimestamp()
                }
                transaction.set(db.collection('reviews').doc(), review)
            }
        })
        return 'success'
    }
)
