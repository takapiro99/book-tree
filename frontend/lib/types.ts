import firebase from '../src/lib/firebase'

export interface UserInfo {
    displayName: string
    profileImage: string
    uid: string
    gratePartList: (string | null | undefined)[]
    createdAt: firebase.firestore.FieldValue
}

export interface Review {
    uid: string | null | undefined
    specialty: string | null | undefined
    title: string
    content: string
    reason: string
    bookImageURL: string
    bookLink: string
    createdAt: firebase.firestore.FieldValue
}

export interface ReviewJoinedUser extends Review {
    user: UserInfo | null | undefined
}

export interface Invitation {
    accepted: boolean
    from: string
    to: string | null
    specialty: string
    token: string
    acceptedAt: firebase.firestore.FieldValue | null
    createdAt: firebase.firestore.FieldValue
}
