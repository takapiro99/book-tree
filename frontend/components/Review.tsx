//import Reviewtree from '../../components/review_tree'
import BookWithReview from './BookWithReview'
import styles from '../styles/Review.module.scss'
import { FaArrowCircleUp, FaBullhorn } from 'react-icons/fa'
import RecComment from './RecComment'
import BigTreeWithBooks from './BigTreeWithBooks'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../src/lib/AuthProvider'
import { getProfile, getReviews, Profile } from '../lib/firestore'
/*  eslint @next/next/no-img-element:0 */

const Review = () => {
    const [isLoadingProfileAndBooks, setLoadingProfileAndBooks] = useState(true)
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            // TODO: fetch profile
            getProfile(currentUser.uid)
                .then((profile) => {
                    if (profile) {
                        console.log(profile)
                    } else {
                        // 深刻なerror
                    }
                })
                .catch((err) => {})
            // TODO: fetch user's reviews
            getReviews(currentUser.uid)
                .then((reviews) => {})
                .catch((err) => {})
            setLoadingProfileAndBooks(false)
        }
    }, [currentUser])

    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    if (isLoadingProfileAndBooks) {
        return <p>loading...</p> // TODO: create loading skeleton component
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
                        <BigTreeWithBooks />
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
                        {/* TODO: このボタンはこんなに目立たせてはいけない */}
                        {/* <button
                            className={`${styles.mypageButtons__buttonGray} ${styles.buttonGray}`}
                        >
                            BOOK TREEを削除する
                        </button> */}
                    </div>

                    <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlock__title}>
                            <h1>{userName} のレビュー</h1>
                            <div>{userName} の選んだ本たち</div>
                        </div>
                        {/* TODO: 本の情報をひとつづつ渡す */}
                        <BookWithReview />
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

export default Review
