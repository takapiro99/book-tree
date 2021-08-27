import * as admin from 'firebase-admin'

export interface UserInfo {
    displayName: string
    profileImage: string
    uid: string
    gratePartList: (string | null | undefined)[]
    createdAt: admin.firestore.FieldValue
}

export interface Review {
    uid: string | null | undefined
    specialty: string | null | undefined
    title: string
    content: string
    reason: string
    bookImageURL: string
    bookLink: string
    createdAt: admin.firestore.FieldValue
}

export interface ReviewJoinedUser extends Review {
    user: UserInfo | null | undefined
}

export type getBookTreePostType = {
    uid: string | null | undefined
}
