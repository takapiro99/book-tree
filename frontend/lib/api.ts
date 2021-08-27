// そのうち各機能ごとにファイル作ったほうがよさそう
import firebase from '../src/lib/firebase'
import { UserInfo, ReviewJoinedUser, Review, Invitation } from './types'

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
    const userIDs = reviews.map((review) => review.uid as string)
    const querySnapshotUser = await db.collection('users').where('uid', 'in', userIDs).get()
    querySnapshotUser.forEach((res) => {
        const userInfo = <UserInfo>res.data()
        reviews.forEach((review) => {
            if (review.uid == userInfo.uid) {
                review.user = userInfo
            }
        })
    })

    return reviews
}

export const fetchBooksEachUser: (userID: string) => Promise<ReviewJoinedUser[]> = async (
    userID
) => {
    const querySnapshotReview = await db.collection('reviews').where('uid', '==', userID).get()

    const querySnapshotUser = await db.collection('users').where('uid', '==', userID).get()

    const userData = <UserInfo>querySnapshotUser.docs[0].data()

    const reviews: ReviewJoinedUser[] = []
    querySnapshotReview.forEach((res) => {
        const review = <ReviewJoinedUser>res.data()
        review.user = userData
        reviews.push(review)
    })

    return reviews
}

// 招待を受け取らずレビューをする。
// TODO: specialtyを書き換え不可能に
export const postReviewsIndividual: (reviews: Review[]) => Promise<boolean> = async (reviews) => {
    for (const review of reviews) {
        if (!review.uid || review.specialty) return false
    }

    const promises: Promise<firebase.firestore.DocumentReference<Review>>[] = []
    for (const review of reviews) {
        promises.push(
            db.collection('reviews').add(review) as Promise<
                firebase.firestore.DocumentReference<Review>
            >
        )
    }

    await Promise.all(promises)

    return true
}

// 招待を受け取ったときのレビュー
export const postReviewsInvitation: (reviews: Review[], token: string) => Promise<boolean> = async (
    reviews,
    token
) => {
    const createInvitationReviewFunc = firebase.functions().httpsCallable('createInvitationReview')
    try {
        const res = await createInvitationReviewFunc({
            token: token,
            reviews: reviews
        })
    } catch {
        return false
    }

    return true
}

// 招待コードが有効かチェック
export const checkInvitation: (token: string) => Promise<Invitation | null> = async (token) => {
    const checkInvitationFunc = firebase.functions().httpsCallable('checkInvitationCode')
    try {
        const res = await checkInvitationFunc({ token: token })
        return res.data as Invitation
    } catch (err) {
        alert(err)
    }

    return null
}

// ブックツリーの取得
export const getBookTree: (userID: string) => Promise<ReviewJoinedUser[] | null> = async (
    userID
) => {
    const getBookTreeFunc = firebase.functions().httpsCallable('getBookTree')
    try {
        const res = await getBookTreeFunc({ uid: userID })
        return res.data() as ReviewJoinedUser[]
    } catch (err) {
        alert(err)
    }

    return null
}
