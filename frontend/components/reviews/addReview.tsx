// TODO: ただコピペしただけ

import styles from '../../styles/ReviewForm.module.scss'

// TODO: tons of refactoring

const AddReview = (props: any) => {
    return (
        <div className={`${styles.reviewformAddreview} ${styles.blockbtwMd}`}>
            <div className={styles.reviewformAddreviewBooks}>
                {/* <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" /> */}
                <div className={styles.plus}>
                    <i className="fas fa-plus-circle"></i>
                </div>
            </div>
            <div className={styles.reviewformAddreviewReview}>
                <div className={styles.reviewformAddreviewReview__reason}>
                    <select>
                        <option defaultValue="grapefruit">**を始めたい人におすすめ</option>
                        <option value="lime">影響を受けたのはこの本！</option>
                        <option value="coconut">難しいけどおすすめ</option>
                        <option value="orange">一番</option>
                    </select>
                </div>
                <textarea
                    className={styles.reviewformAddreviewReview__review}
                    placeholder="レビューを入力してください"
                />
            </div>
        </div>
    )
}

export default AddReview
