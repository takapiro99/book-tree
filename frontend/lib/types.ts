import firebase from '../src/lib/firebase'

export type UserInfo = {
    display_name: string
    email: string
    profileImage: string
    uid: string
    created_at: firebase.firestore.FieldValue
}

export type ReviewJoinedUser = {
    userID: string | null | undefined
    specialty: string | null | undefined
    title: string
    content: string
    reason: string
    bookImageURL: string
    bookLink: string
    createdAt: firebase.firestore.FieldValue
    user: UserInfo | null | undefined
}
