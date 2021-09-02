import { Review, UserInfo } from '../lib/types'
import styles from '../styles/Review.module.scss'
import BookOnBigTree from './BookOnBigTree'

const BookWithReview = ({ review, userInfo }: { review: Review; userInfo: UserInfo }) => {
    return (
        <div className={styles.reviewpageReviewBlock}>
            <div className={styles.reviewpageReviewBook}>
                <BookOnBigTree withYellowBackground review={{ ...review, user: userInfo }} />
            </div>
            <div className={styles.reviewpageReviewContent}>
                <div className={styles.reviewpageReviewContent__reason}>{review.reason}</div>
                <div className={styles.reviewpageReviewContent__comment}>{review.content}</div>
            </div>
        </div>
    )
}
export default BookWithReview
