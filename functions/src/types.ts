import * as admin from 'firebase-admin'

export type Review = {
    uid: string | null | undefined
    specialty: string | null | undefined
    title: string
    content: string
    reason: string
    bookImageURL: string
    bookLink: string
    createdAt: admin.firestore.FieldValue
}

export type getBookTreePostType = {
    uid: string | null | undefined
}
