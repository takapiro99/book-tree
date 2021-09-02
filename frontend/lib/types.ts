import firebase from './firebase'
import { Timestamp } from '@firebase/firestore-types'

export interface UserInfo {
    createdAt: Timestamp
    displayName: string
    gratePartList: (string | null | undefined)[]
    profileImage: string
    uid: string
}
// functionsにreviewをpostするときの型
export interface PostReview {
    content: string
    reason: string
    isbn: string
}

export interface Review {
    bookImageURL: string
    bookLink: string
    content: string
    createdAt: Timestamp
    reason: string
    specialty: string | null | undefined
    title: string
    uid: string
}

export interface ReviewJoinedUser extends Review {
    user: UserInfo
}

export interface Invitation {
    accepted: boolean
    acceptedAt: Timestamp | null
    createdAt: Timestamp
    from: string
    specialty: string
    to: string | null
    token: string
}

// 必要な属性だけ抽出 (適時追加)
export interface RakutenBookItem {
    Item: {
        title: string
        author: string
        itemUrl: string
        largeImageUrl: string
        mediumImageUrl: string
        smallImageUrl: string
        booksGenreId: string
        publisherName: string
        isbn: string // ISBNコードという書籍のユニークなID
    }
}

export interface RakutenResponse {
    Items: RakutenBookItem[]
    carrier: number
    count: number
    first: number
    hits: number
    last: number
    page: number
    pageCount: number
}

export interface getBookTreePostType {
    userID: string | null | undefined
}
