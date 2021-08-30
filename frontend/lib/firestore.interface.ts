import { Timestamp } from '@firebase/firestore-types'

export interface Review {
    bookImageURL: string
    bookLink: string
    content: string
    createdAt: Timestamp
    reason: string
    specialty: string | null | undefined
    title: string
    user: string | null | undefined // aka uid
}

export interface FirestoreUser {
    createdAt: Timestamp
    displayName: string
    gratePartList: (string | null)[]
    profileImage: string
    uid: string
}

export interface Invitation {
    accepted: boolean
    acceptedAt: Timestamp
    createdAt: Timestamp
    from: string
    specialty: string
    to: string
    token: string
}

export interface getBookTreePostType {
    userID: string | null | undefined
}
