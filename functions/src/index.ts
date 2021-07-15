import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { randomBytes } from 'crypto'

admin.initializeApp()

const generateToken = async () => {
    const N = 16
    const loopNumber = 10 // 無限ループ防止のために10回で区切る

    for (let i = 0; i < loopNumber; i++) {
        let token = randomBytes(N).toString('base64').substring(0, N)
        let invitationDoc = await admin
            .firestore()
            .collection('invitations')
            .doc(token)
            .get()
        if (invitationDoc.exists == false) {
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
        const token = generateToken()

        console.log(data)
        console.log(context.auth)

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
