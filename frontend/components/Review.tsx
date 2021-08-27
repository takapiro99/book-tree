//import Reviewtree from '../../components/review_tree'
import BookWithReview from './BookWithReview'
import styles from '../styles/Review.module.scss'
import { FaArrowCircleUp, FaBullhorn } from 'react-icons/fa'
import RecComment from './RecComment'
import BigTreeWithBooks from './BigTreeWithBooks'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

/*  eslint @next/next/no-img-element:0 */

const Review = () => {
    const returnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const router = useRouter()

    return (
        <>
            {/* <div className={globalStyles.wrapper}> */}
            {/* 本の情報を複数渡す */}
            {/* </div> */}
            <div className={styles.mypageNews}>
                <div className={styles.mypageNews__news}>
                    <FaBullhorn />
                    <a href="#review">お願いしていたレビューが届いたよ！</a>
                </div>
            </div>

            <div className={styles.reviewpageReview}>
                <div className={`${styles.reviewWrapper2}`}>
                    <div className={styles.reviewUserBlock}>
                        <img
                            className={styles.icon}
                            alt="user icon"
                            src={
                                'http://flat-icon-design.com/f/f_object_156/s256_f_object_156_0bg.png'
                            }
                        ></img>
                        <div className={styles.reviewUserName}>
                            {/* <div>紹介してくれたのは・・・</div> */}
                            <div className={styles.reviewUserName__name}>NEKOさん</div>
                            <div className={styles.reviewUserKeywords}>
                                北大OG ＋ 猫 ＋ マイクラ
                            </div>
                        </div>
                    </div>
                    <div className={styles.reccomment}>
                        <div className={styles.reccomment_content}>
                            <RecComment comment="フロントエンド" />
                            <RecComment comment="デザイン" />
                            <RecComment comment="フロントエンド" />
                        </div>
                    </div>

                    <div className="blockbtwMd"></div>

                    <div className={styles.reviewBigTree}>
                        <h1>NekoさんのBook Tree</h1>
                        <div>Nekoさんのところに集まった本たち</div>
                        <BigTreeWithBooks />
                    </div>
                    <div className={styles.mypageButtons}>
                        <button className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}>
                            レビューを作成する
                        </button>
                        <Link href={`/invite`} passHref={true}>
                            <button
                                className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}
                            >
                                レビューをお願いする
                            </button>
                        </Link>
                        <button
                            className={`${styles.mypageButtons__buttonGray} ${styles.buttonGray}`}
                        >
                            BOOK TREEを削除する
                            {/* このボタンはこんなに目立たせてはいけない */}
                        </button>
                    </div>

                    <div className={styles.reviewBlock}>
                        <div className={styles.reviewBlock__title}>
                            <h1>Nekoさんのレビュー</h1>
                            <div>Nekoさんの選んだ本たち</div>
                        </div>
                        {/* 本の情報をひとつづつ渡す */}
                        <BookWithReview />
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
