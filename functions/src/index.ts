import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {
    Review,
    getBookTreePostType,
    ReviewJoinedUser,
    UserInfo,
    PostReview
} from './types'
import {
    validateReview,
    generateToken,
    fetchBookFromRakutenAPIByIsbn
} from './util'

admin.initializeApp()
const dbType = admin.firestore
const db = admin.firestore()

export const userOnCreate = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .auth.user()
    .onCreate(async (user) => {
        await db.runTransaction(async (transaction) => {
            const photoURL = user?.photoURL?.includes('twimg')
                ? user.photoURL.replace('normal', '400x400')
                : user.photoURL

            transaction.set(db.collection('users').doc(user.uid), {
                uid: user.uid,
                profileImage: photoURL,
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

// ユーザー削除時にレビュー,ユーザー,招待を削除
export const userOnDelete = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .auth.user()
    .onDelete(async (user) => {
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

export const createInvitationCode = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data, context) => {
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
            // TODO: token だけ生成して、URLはフロントエンドで `location.origin` で生成するほうがよさそう
            // サーバー側でフロントのURLが分からんので
            // それと、`/invitation/{token}` っていうパスにしました…
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
            return token
        } else {
            throw new functions.https.HttpsError(
                'aborted',
                'トークンの生成に失敗しました。'
            )
        }
    })

// 招待コードが有効かどうか調べる。有効なら招待オブジェクトを返す。
export const checkInvitationCode = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data, context) => {
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

        if (docData.from === context?.auth?.uid) {
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

        // if (context.auth?.uid === undefined) {
        //     throw new functions.https.HttpsError(
        //         'failed-precondition',
        //         'ログインをしてください'
        //     )
        // }

        return docData
    })

export const createInvitationReview = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data, context) => {
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
                const bookData = await fetchBookFromRakutenAPIByIsbn(
                    postReview.isbn
                )
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
    })

export const getBookTree = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data: getBookTreePostType, context) => {
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
    })

export const deleteBookTree = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data, context) => {
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

// 招待無しでレビューを作成する。
export const createReviewsIndividual = functions
    .runWith({ memory: '1GB' })
    .region('asia-northeast1')
    .https.onCall(async (data, context) => {
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
                const bookData = await fetchBookFromRakutenAPIByIsbn(
                    postReview.isbn
                )
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
    })
