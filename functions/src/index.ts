import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const crypto = require('crypto')

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

        let querySnapshot = await admin
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

export const userOnCreate = functions.auth.user().onCreate(async (user) => {
    let userDoc = await admin
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()

    await userDoc.ref.set({
        screen_name: user.uid,
        display_name: user.displayName,
        created_at: admin.firestore.FieldValue.serverTimestamp()
    })
})

export const createInvitationCode = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            return "ログインをしてください"
        }

        const token = await generateToken()

        if (token) {
            const invitationURL = `http://localhost:3000/invite/?token=${token}`
            let invitationsRef = admin.firestore().collection('invitations')
            invitationsRef.add({
                to: null,
                from: context.auth?.uid,
                token: token,
                accepted: false,
                created_at: admin.firestore.FieldValue.serverTimestamp()
            })
            return invitationURL
        } else {
            return 'error'
        }
    }
)

export const checkInvitationCode = functions.https.onCall(
    async (data, context) => {
        if (context.auth?.uid === undefined) {
            return "ログインをしてください"
        }
        const clientToken = data.text
        console.log(clientToken)
        let querySnapshot = await admin
            .firestore()
            .collection('invitations')
            .where('token', '==', clientToken)
            .get()
        if (querySnapshot.size === 0) {
            return '無効な招待コードです'
        } else if (querySnapshot.size === 1) {
            let docData = querySnapshot.docs[0].data();
            if (docData.accepted === true) {
                return "既に承認されています。"
            }
            
        } else {
            return 'トークンが重複しています'
        }

        let docId = querySnapshot.docs[0].id;
        docId.strike
    }
)
