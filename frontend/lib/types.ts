import firebase from '../src/lib/firebase'

export interface UserInfo {
    displayName: string
    profileImage: string
    uid: string
    gratePartList: (string | null | undefined)[]
    createdAt: firebase.firestore.FieldValue
}

// functionsにreviewをpostするときの型
export interface PostReview {
    content: string
    reason: string
    isbn: string
}

export interface Review {
    uid: string
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
