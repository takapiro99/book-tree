import styles from "../styles/ReviewForm.module.scss";
import Books from "./Books";
const AddReview = () => {
    return(
        <div className={`${styles.reviewformAddreview} ${styles.blockbtwMd}`}>
        <div className={styles.reviewformAddreviewBooks}>
        <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" />
        </div>
        <div className={styles.reviewformAddreviewReview}>
        <div className={styles.reviewformAddreviewReview__reason}>お勧めする理由を選択</div>
        <input className={styles.reviewformAddreviewReview__review} placeholder="レビューを入力してください" />
        </div>
    </div>
    );
}
export default AddReview;