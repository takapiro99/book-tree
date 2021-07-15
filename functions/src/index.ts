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
        const token = await generateToken()

        if (token) {
            const invitationURL = `http://localhost:3000/invite/?token=${token}`
            let invitationsRef = admin.firestore().collection('invitations')
            invitationsRef.add({
                to: 'user',
                from: '',
                token: token,
                created_at: admin.firestore.FieldValue.serverTimestamp()
            })
            return invitationURL
        } else {
            return 'error'
        }
    }
)
