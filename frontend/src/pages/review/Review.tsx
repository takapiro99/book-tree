import Reviewtree from "../../components/review_tree";
import BookWithReview from "../../components/BookWithReview";
import styles from "../../styles/Review.module.scss";
import globalStyles from "../../styles/Global.module.scss";
const Review = () => {
    return <div className={globalStyles.wrapper}>
        <Reviewtree />
        <div className="reviewpage-review">
            <h1 className={styles.reviewpageReview__title}>＊＊＊さんがおすすめの本</h1>
        </div>
        <div className={`${styles.reviewpageReview} ${globalStyles.blockbtwMd}`}>
        <BookWithReview />
        <BookWithReview />
        </div>

        
    </div>;
}

export default Review;