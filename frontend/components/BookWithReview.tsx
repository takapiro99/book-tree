import styles from '../styles/Review.module.scss'
import BookOnBigTree from './BookOnBigTree'

const BookWithReview = () => {
    return (
        <div className={styles.reviewpageReviewBlock}>
            <div className={styles.reviewpageReviewBook}>
                <BookOnBigTree withYellowBackground />
            </div>
            <div className={styles.reviewpageReviewContent}>
                <div className={styles.reviewpageReviewContent__reason}>初学者におすすめ</div>
                <div className={styles.reviewpageReviewContent__comment}>
                    ここがすごいと思います！
                </div>
            </div>
        </div>
    )
}
export default BookWithReview
