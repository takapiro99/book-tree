import RecommendedSentence from "../../components/RecommendedSentence";
import Reviewtree from "../../components/review_tree";
import BookWithReview from "../../components/BookWithReview";
import styles from "../../styles/Review.module.scss";
import globalStyles from "../../styles/Global.module.scss";

const Review = () => {
    return <><div className={globalStyles.wrapper}>
        <RecommendedSentence />
        {/* 本の情報を複数渡す */}
        <Reviewtree />
        
        </div>
        
        <div className={styles.reviewpageReview}>
        <div className={styles.yellowgreenbar}></div>
        <div className={styles.reviewWrapper2}>
            <h1 className={styles.reviewpageReview__title}>＊＊＊さんがおすすめの本</h1>
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