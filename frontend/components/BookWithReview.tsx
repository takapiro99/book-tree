import { ReviewJoinedUser } from '../lib/types'
import styles from '../styles/Review.module.scss'
import BookOnBigTree from './BookOnBigTree'

const BookWithReview = ({ review }: { review: ReviewJoinedUser }) => {
    return (
        <div className={`${styles.reviewpageReviewBlock} container`}>
            <div className={styles.reviewpageReviewBook}>
                <BookOnBigTree withYellowBackground review={review} />
            </div>
            <div className={styles.reviewpageReviewContent}>
                <div className={styles.reviewpageReviewContent__reason}>{review.reason}</div>
                <div className={styles.reviewpageReviewContent__comment}>{review.content}</div>
            </div>
        </div>
    )
}

export default BookWithReview
