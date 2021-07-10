import RecommendedSentence from "../../components/RecommendedSentence";
import Reviewtree from "../../components/review_tree";
import BookWithReview from "../../components/BookWithReview";
import styles from "../../styles/Review.module.scss";
import globalStyles from "../../styles/Global.module.scss";

const Review = () => {
    return <><div className={globalStyles.wrapper}>
        <RecommendedSentence />
        {/* 本の情報を複数渡す */}
        </div>
        
        <div className={styles.reviewpageReview}>
        <div className={`${styles.reviewWrapper2}`}>
            <div className={styles.reviewUserBlock}>
                <div className={styles.icon}>icon </div>
                <div className={styles.reviewUserName}>
                    <div>紹介してくれたのは・・・</div>
                    <div className={styles.reviewUserName__name}>NEKOさん</div>
                </div>
                <div className={styles.reviewUserKeywords}>北大OG ＋ 猫 ＋ マイクラ</div>

            </div>

            <div className={globalStyles.blockbtwMd}>ここに推薦の吹き出し</div>

            <div className={styles.reviewBlock}>
            {/* 本の情報をひとつづつ渡す */}
            <BookWithReview />
            <BookWithReview />
            </div>
        </div>
    </div></>
    ;
}

export default Review;