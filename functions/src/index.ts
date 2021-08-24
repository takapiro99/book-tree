import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import crypto = require('crypto')
import validUrl = require('valid-url')

type Review = {
    userID: string | null | undefined
    specialty: string | null | undefined
    title: string
    content: string
    bookImageURL: string
    bookLink: string
    createdAt: admin.firestore.FieldValue
}

type getBookTreePostType = {
    userID: string | null | undefined
}

admin.initializeApp()

const generateToken = async () => {
    const N = 16
    const loopNumber = 10 // 無限ループ防止のために10回で区切る
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < loopNumber; i++) {
        const randomArray: number[] = Array.from(
            crypto.randomFillSync(new Uint8Array(N))
        )
        const token = randomArray.map((n: number) => S[n % S.length]).join('')

        const querySnapshot = await admin
            .firestore()
            .collection('invitations')
            .where('token', '==', token)
            .get()
        if (querySnapshot.size === 0) {
            return token
        }
    }
    return null
}

// validateに失敗したらHttpErrorを出す
const validateReview: (review: Review) => void = (review) => {
    if (
        !review.title ||
        !review.content ||
        !review.bookImageURL ||
        !validUrl.isUri(review.bookLink)
    ) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            '必須の項目を入力してください。'
        )
    }

    if (
        !validUrl.isUri(review.bookImageURL) ||
        !validUrl.isUri(review.bookLink)
    ) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            '不正なURLです'
        )
    }
}

export const userOnCreate = functions.auth.user().onCreate(async (user) => {
    const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()

    await userDoc.ref.set({
        uid: user.uid,
        profileImage: user.photoURL,
        display_name: user.displayName,
        email: user.email,
        created_at: admin.firestore.FieldValue.serverTimestamp()
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
            const invitationsRef = admin.firestore().collection('invitations')
            invitationsRef.add({
                to: null,
                from: context.auth?.uid,
                token: token,
                accepted: false,
                specialty: specialty,
                created_at: admin.firestore.FieldValue.serverTimestamp()
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
        const querySnapshot = await admin
            .firestore()
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
        const querySnapshot = await admin
            .firestore()
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
        reviews.forEach(async (review) => {
            validateReview(review)
            review.userID = context.auth?.uid
            review.createdAt = admin.firestore.FieldValue.serverTimestamp()
            review.specialty = docData.specialty
            await admin.firestore().collection('reviews').add(review)
        })

        const docId = querySnapshot.docs[0].id
        await admin.firestore().collection('invitations').doc(docId).update({
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
        const isFrom = admin
            .firestore()
            .collection('invitations')
            .where('from', '==', userID)
            .where('accepted', '==', true)
            .get()
        const isTo = admin
            .firestore()
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
        console.log(userIDs)

        const bookTree: Review[] = []
        for (const id of userIDs) {
            const querySnapshot = await admin
                .firestore()
                .collection('reviews')
                .where('userID', '==', id)
                .get()
            querySnapshot.forEach((res) => {
                bookTree.push(<Review>res.data())
            })
        }
        return bookTree
    }
)
