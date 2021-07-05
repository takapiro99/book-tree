import Reviewtree from "../../components/review_tree";
import BookWithReview from "../../components/BookWithReview";
import styles from "../../styles/Review.module.scss";

const Review = () => {
    return <div>
        <Reviewtree />
        <div className="reviewpage-review">
            <h1 className={styles.reviewpageReview__title}>＊＊＊さんがおすすめの本</h1>
        </div>

        <BookWithReview />
        <BookWithReview />

        
    </div>;
}

export default Review
