import { FirestoreUser, Review } from './firestore.interface'
import { Timestamp } from '@firebase/firestore'

export const getProfile = async (uid: string): Promise<FirestoreUser | null> => {
    const mock = {
        uid: 'cao1Z4k8qChB0gqzYiHJh0IaICf1', // takapiro
        displayName: 'takapiro',
        profileImage:
            'https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_normal.jpg',
        gratePartList: [null, null, null],
        createdAt: Timestamp.now()
    }
    return mock
}

export const getReviewsFromUid = async (uid: string): Promise<Review[]> => {
    return [
        {
            user: 'cao1Z4k8qChB0gqzYiHJh0IaICf1',
            specialty: '身長',
            bookImageURL: 'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            title: 'いい本',
            content: 'めっちゃいい本',
            createdAt: Timestamp.now(), // timestamp
            reason: 'めっちゃいい'
        },
        {
            user: 'cao1Z4k8qChB0gqzYiHJh0IaICf1',
            specialty: '身長',
            bookImageURL: 'https://shop.r10s.jp/book/cabinet/1040/9784097251040.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/11182318/',
            title: 'いい本',
            content: 'めっちゃいい本',
            createdAt: Timestamp.now(), // timestamp
            reason: 'めっちゃいい'
        }
    ]
}
