import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Review, getBookTreePostType } from './types'
import { validateReview, generateToken } from './util'

admin.initializeApp()
const dbType = admin.firestore // 型の定義に使う
const db = admin.firestore()

export const userOnCreate = functions.auth.user().onCreate(async (user) => {
    const userDoc = await db.collection('users').doc(user.uid).get()

    await userDoc.ref.set({
        uid: user.uid,
        profileImage: user.photoURL,
        display_name: user.displayName,
        email: user.email,
        created_at: dbType.FieldValue.serverTimestamp()
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
                created_at: dbType.FieldValue.serverTimestamp()
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

        const reviews: Review[] = data.reviews
        const reviewPromises: Promise<
            admin.firestore.DocumentReference<admin.firestore.DocumentData>
        >[] = []
        reviews.forEach(async (review) => {
            validateReview(review)
            review.userID = context.auth?.uid
            review.createdAt = dbType.FieldValue.serverTimestamp()
            review.specialty = docData.specialty
            reviewPromises.push(db.collection('reviews').add(review))
        })

        await Promise.all(reviewPromises)

        const docId = querySnapshot.docs[0].id
        await db.collection('invitations').doc(docId).update({
            accepted: true,
            to: context.auth.uid
        })
        return 'success'
    }
)

export const getBookTree = functions.https.onCall(
    async (data: getBookTreePostType, context) => {
        const userID = data.userID
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

        const bookTree: Review[] = []
        const reviewPromises: Promise<
            admin.firestore.QuerySnapshot<admin.firestore.DocumentData>
        >[] = []
        for (const id of userIDs) {
            reviewPromises.push(
                db.collection('reviews').where('userID', '==', id).get()
            )
        }

        const querySnapshots = await Promise.all(reviewPromises)

        querySnapshots.forEach((querySnapshot) => {
            querySnapshot.forEach((res) => {
                bookTree.push(<Review>res.data())
            })
        })
        return bookTree
    }
)
