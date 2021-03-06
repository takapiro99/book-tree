// そのうち各機能ごとにファイル作ったほうがよさそう
import { db, functions } from './firebase'
import { errorToast } from './toasts'
import { UserInfo, ReviewJoinedUser, Invitation, RakutenResponse, PostReview } from './types'

export const fetchBooksToShowOnTopPage: () => Promise<ReviewJoinedUser[]> = async () => {
    // TODO: await は try catch!　エラーハンドリング！
    const querySnapshotReview = await db
        .collection('reviews')
        .where('createdAt', '!=', false)
        .orderBy('createdAt', 'desc')
        .limit(9)
        .get()
    const reviews: ReviewJoinedUser[] = []
    querySnapshotReview.forEach((res) => {
        if (!res) {
            console.warn('api.ts [warn] no books to show at home page')
            return
        }
        reviews.push(<ReviewJoinedUser>res.data())
    })

    if (reviews.length === 0) {
        return []
    }
    const promises = []

    reviews.forEach((review) => {
        promises.push(review)
    })

    // レビューの数が最大で9個なので速度に劣る2重ループでも良し
    const userIDs = reviews.map((review) => review.uid as string)
    const querySnapshotUser = await db.collection('users').where('uid', 'in', userIDs).get()
    querySnapshotUser.forEach((res) => {
        if (!res) {
            console.warn('api.ts [warn] no user info')
            return
        }
        const userInfo = <UserInfo>res.data()
        reviews.forEach((review) => {
            if (review.uid == userInfo.uid) {
                review.user = userInfo
            }
        })
    })

    return reviews
}

export const getReviewsFromUser: (
    userID: string | null | undefined
) => Promise<ReviewJoinedUser[] | null> = async (userID) => {
    if (!userID) {
        return null
    }
    // TODO: check if user with userID exists
    const querySnapshotReview = await db.collection('reviews').where('uid', '==', userID).get()

    const querySnapshotUser = await db.collection('users').where('uid', '==', userID).get()
    let userData: any
    if (querySnapshotUser.docs[0]) {
        console.warn('api.ts[warn] no query snapshot user')
        userData = <UserInfo>querySnapshotUser.docs[0].data()
    }

    const reviews: ReviewJoinedUser[] = []
    querySnapshotReview.forEach((res) => {
        if (!res) {
            console.warn(`no reviews from ${userID}`)
            return
        }
        const review = <ReviewJoinedUser>res.data()
        review.user = userData
        reviews.push(review)
    })

    return reviews
}

// 招待を受け取らずレビューをする。
// TODO: specialtyを書き換え不可能に
export const postReviewsIndividual: (postReviews: PostReview[]) => Promise<boolean> = async (
    postReviews
) => {
    const createReviewsIndividualFunc = functions.httpsCallable('createReviewsIndividual')
    try {
        const res = await createReviewsIndividualFunc({ postReviews: postReviews })
    } catch (err) {
        console.log(err)
        errorToast(err.toString())
        return false
    }
    return true
}

// 招待を受け取ったときのレビュー
export const postReviewsInvitation: (postReviews: PostReview[], token: string) => Promise<boolean> =
    async (postReviews, token) => {
        const createInvitationReviewFunc = functions.httpsCallable('createInvitationReview')
        try {
            const res = await createInvitationReviewFunc({
                token: token,
                postReviews: postReviews
            })
        } catch (err) {
            errorToast(err.toString())
            return false
        }
        return true
    }

// 招待コードが有効かチェック
// 招待が有効だったら招待オブジェクトを返す
export const checkInvitation: (token: string) => Promise<Invitation | null> = async (token) => {
    const checkInvitationFunc = functions.httpsCallable('checkInvitationCode')
    try {
        const res = await checkInvitationFunc({ token: token })
        return res.data as Invitation
    } catch (err) {
        throw new Error(err.toString())
    }
}

// 招待コードの作成
// 招待URLを返す
export const createInvitationCode: (specialty: string) => Promise<string | null> = async (
    specialty
) => {
    const createInvitationFunc = functions.httpsCallable('createInvitationCode')
    try {
        const res = await createInvitationFunc({ specialty: specialty })
        return res.data as string
    } catch (err) {
        throw new Error(err.toString())
    }
}

// ブックツリーの取得
export const getBookTree: (
    userID: string | null | undefined
) => Promise<ReviewJoinedUser[] | null> = async (userID) => {
    if (!userID) {
        return null
    }

    const getBookTreeFunc = functions.httpsCallable('getBookTree')
    try {
        const res = await getBookTreeFunc({ uid: userID })
        return res.data as ReviewJoinedUser[]
    } catch (err) {
        throw new Error(err.toString())
    }
}

export const deleteBookTree: () => Promise<boolean> = async () => {
    const deleteBookTreeFunc = functions.httpsCallable('deleteBookTree')
    try {
        const res = await deleteBookTreeFunc()
    } catch (err) {
        errorToast(err.toString())
        // throw new Error(err.toString())
        return false
    }

    return true
}

export const fetchBookListFromRakutenAPIByTitle: (title: string) => Promise<RakutenResponse> =
    async (title) => {
        const applicationId = '1009172447759483209'
        const url = `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${applicationId}&title=${title}`
        const res = await fetch(url)
        const data = (await res.json()) as RakutenResponse
        return data
    }

export const getUserInfo = async (uid: string): Promise<UserInfo> => {
    return db
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.docs.length) {
                console.warn('no corresponding firestore uid found')
                throw new Error('no corresponding firestore uid found')
            } else if (querySnapshot.docs.length >= 2) {
                throw new Error(`${querySnapshot.docs.length} records have same uid`)
            }
            const userInfo = querySnapshot.docs[0].data() as UserInfo
            return userInfo
        })
}

export const updateGratePartList = async (
    uid: string,
    gratePartList: (string | null | undefined)[]
) => {
    try {
        await db.collection('users').doc(uid).update({ gratePartList: gratePartList })
        return true
    } catch (err) {
        // throw new Error(err.toString())
        // TODO: 伝わらない
        errorToast(err.toString())
        return false
    }
}
