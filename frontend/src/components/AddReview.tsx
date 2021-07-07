import styles from "../styles/ReviewForm.module.scss";
import Books from "./Books";
const AddReview = () => {
    return(
        <div className={`${styles.reviewformAddreview} ${styles.blockbtwMd}`}>
        <div className={styles.reviewformAddreviewBooks}>
        <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" />
        </div>
        <div className={styles.reviewformAddreviewReview}>
        <div className={styles.reviewformAddreviewReview__reason}>
        <select>
        <option selected　value="grapefruit">**＊を始めたい人におすすめ</option>
        <option value="lime">影響を受けたのはこの本！</option>
        <option value="coconut">難しいけどおすすめ</option>
        </select>
        </div> 
        <input className={styles.reviewformAddreviewReview__review} placeholder="レビューを入力してください" />
        </div>
    </div> 
    );
}
export default AddReview;