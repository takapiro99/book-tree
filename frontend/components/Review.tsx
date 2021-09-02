import BookWithReview from './BookWithReview'
import styles from '../styles/Review.module.scss'
import { FaArrowCircleUp, FaBullhorn } from 'react-icons/fa'
import RecComment from './RecComment'
import BigTreeWithBooks from './BigTreeWithBooks'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { getReviewsFromUser, getUserInfo } from '../lib/api'
import { ReviewJoinedUser, UserInfo } from '../lib/types'
/*  eslint @next/next/no-img-element:0 */

const isNullGradePart = (arr: (string | null | undefined)[]) => {
    let f = true
    if (arr.length !== 3) f = false
    if (arr.filter((el) => el !== null).length === 0) return false
    return true
}

const ReviewPage = ({ uid }: { uid: string }) => {
    // TODO: userInfoもbooksもサーバー側で取得しとく説ある
    const [isLoadingProfileAndBooks, setLoadingProfileAndBooks] = useState(true)
    const [targetUserInfo, setTargetUserInfo] = useState<null | UserInfo>(null)
    const [reviews, setReviews] = useState<ReviewJoinedUser[]>([])
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        getUserInfo(uid)
            .then((profile) => {
                if (profile) {
                    setTargetUserInfo(profile)
                    getReviewsFromUser(profile.uid)
                        .then((reviews) => {
                            if (reviews) {
                                setReviews(reviews)
                                setLoadingProfileAndBooks(false)
                            }
                        })
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
    }, []) // eslint-disable-line

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
    if (!targetUserInfo) return null
    const userName = targetUserInfo.displayName
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
                            src={targetUserInfo.profileImage as string}
                        />
                        <div className={styles.reviewUserName}>
                            {/* <div>紹介してくれたのは・・・</div> */}
                            <div className={styles.reviewUserName__name}>
                                {userName}
                                <span style={{ fontSize: '1rem' }}>さん</span>
                            </div>
                            {isNullGradePart(targetUserInfo.gratePartList) ? (
                                <div className={styles.reviewUserKeywords}>
                                    {targetUserInfo.gratePartList
                                        .filter((el) => el !== null)
                                        .join(' + ')}
                                </div>
                            ) : (
                                <div className={styles.reviewUserKeywords}>
                                    まだ自己紹介が設定されていないよ！
                                </div>
                            )}
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
                                {reviews.map((review, i) => {
                                    return <BookWithReview key={i} review={review} />
                                })}
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
