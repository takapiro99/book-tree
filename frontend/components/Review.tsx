import BookWithReview from './BookWithReview'
import styles from '../styles/Review.module.scss'
import { FaArrowCircleUp, FaBullhorn } from 'react-icons/fa'
import RecComment from './RecComment'
import BigTreeWithBooks from './BigTreeWithBooks'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { getUserInfo } from '../lib/firestore'
import { getReviewsFromUser } from '../lib/api'
import { Review, UserInfo } from '../lib/types'
/*  eslint @next/next/no-img-element:0 */

const ReviewPage = ({ uid }: { uid: string }) => {
    const [isLoadingProfileAndBooks, setLoadingProfileAndBooks] = useState(true)
    const [targetUserInfo, setTargetUserInfo] = useState<null | UserInfo>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const { currentUser } = useContext(AuthContext)
    console.log(reviews)
    useEffect(() => {
        if (currentUser) {
            getUserInfo(uid)
                .then((profile) => {
                    if (profile) {
                        setTargetUserInfo(profile)
                        getReviewsFromUser(profile.uid)
                            .then((reviews) => setReviews(reviews as Review[]))
                            .catch((err) => alert(err))
                    } else {
                        console.log('no user info')
                        setLoadingProfileAndBooks(false)
                    }
                })
                .catch((err: any) => {
                    alert(err)
                    setLoadingProfileAndBooks(false)
                })
        }
    }, [currentUser])
    if (!isLoadingProfileAndBooks && !targetUserInfo) {
        console.log(isLoadingProfileAndBooks, targetUserInfo)
        return <>no user which uid={uid}</>
    }
    if (isLoadingProfileAndBooks) {
        return <p>loading...</p> // TODO: create loading skeleton component
    }

    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    if (!currentUser) return null
    const userName = currentUser.displayName
    return (
        <>
            {/* <div className={globalStyles.wrapper}> */}
            {/* 本の情報を複数渡す */}
            {/* </div> */}
            {/* <div className={styles.mypageNews}>
                <div className={styles.mypageNews__news}>
                    <FaBullhorn />
                    <a href="#review">お願いしていたレビューが届いたよ！</a>
                </div>
            </div> */}

            <div className={styles.reviewpageReview}>
                <div className={styles.reviewWrapper2}>
                    <div className={styles.reviewUserBlock}>
                        <img
                            className={styles.icon}
                            alt="user icon"
                            src={currentUser.photoURL as string}
                        />
                        <div className={styles.reviewUserName}>
                            {/* <div>紹介してくれたのは・・・</div> */}
                            <div className={styles.reviewUserName__name}>
                                {userName}
                                <span style={{ fontSize: '1rem' }}>さん</span>
                            </div>
                            <div className={styles.reviewUserKeywords}>
                                北大OG ＋ 猫 ＋ マイクラ
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.reccomment}>
                        <div className={styles.reccomment_content}>
                            <RecComment comment="フロントエンド" />
                            <RecComment comment="デザイン" />
                            <RecComment comment="フロントエンド" />
                        </div>
                    </div> */}

                    <div className="blockbtwMd"></div>

                    <div className={styles.reviewBigTree}>
                        <h1>{userName} のBook Tree</h1>
                        <div>{userName} のところに集まった本たち</div>
                        <BigTreeWithBooks uid={uid} />
                    </div>
                    <div className={styles.mypageButtons}>
                        {/* <button className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}>
                            レビューを作成する
                        </button> */}
                        <Link href={`/invite`} passHref={true}>
                            <button
                                className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}
                            >
                                レビューをお願いする
                            </button>
                        </Link>
                    </div>

                    <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlock__title}>
                            <h1>{userName} のレビュー</h1>
                        </div>
                        {/* TODO: 本の情報をひとつづつ渡す */}
                        {reviews.length ? (
                            <>
                                <div style={{ textAlign: 'center' }}>{userName} の選んだ本たち</div>
                                {reviews.map((review, i) => (
                                    <BookWithReview
                                        key={i}
                                        review={review}
                                        userInfo={targetUserInfo as UserInfo}
                                    />
                                ))}
                            </>
                        ) : (
                            <p style={{ textAlign: 'center' }}>
                                {targetUserInfo?.displayName} さんのレビューはまだありません！
                            </p>
                        )}
                    </div>
                </div>

                <button className={styles.topBtn} onClick={returnTop}>
                    <p className={styles.topBtn_icon}>
                        <FaArrowCircleUp />
                    </p>
                    <p className={styles.topBtn_txt}>Topに戻る</p>
                </button>
            </div>
        </>
    )
}

export default ReviewPage
