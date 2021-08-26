// そのうち各機能ごとにファイル作ったほうがよさそう
import firebase from '../src/lib/firebase'
import { BookOnBigTreeProps } from '../components/BookOnBigTree'
import { UserInfo, ReviewJoinedUser } from './types'

const db = firebase.firestore()

export const fetchBooksToShowOnTopPage = async () => {
    const querySnapshotReview = await db
        .collection('reviews')
        .orderBy('createdAt', 'desc')
        .limit(9)
        .get()
    const reviews: ReviewJoinedUser[] = []
    querySnapshotReview.forEach((res) => {
        reviews.push(<ReviewJoinedUser>res.data())
    })
    const promises = []
    // userIDは必ずある
    reviews.forEach((review) => {
        promises.push(review)
    })

    // レビューの数が最大で9個なので速度に劣る2重ループでも良し
    const userIDs = reviews.map((review) => review.userID as string)
    const querySnapshotUser = await db.collection('users').where('uid', 'in', userIDs).get()
    querySnapshotUser.forEach((res) => {
        const userInfo: UserInfo = <UserInfo>res.data()
        reviews.forEach((review) => {
            if (review.userID == userInfo.uid) {
                review.user = userInfo
            }
        })
    })

    return reviews
}

export const fetchBooksEachUser: (userID: string) => BookOnBigTreeProps[] = (userID) => {
    const mockData = [
        {
            bookImageURL: 'https://tshop.r10s.jp/book/cabinet/9420/4534530129420.jpg',
            bookLink: 'https://books.rakuten.co.jp/rb/16674317/',
            userID: userID,
            userIconImage: 'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
        }
    ]
    return mockData
}
