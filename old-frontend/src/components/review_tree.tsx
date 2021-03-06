import review_tree from '../assets/review_tree.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import fukidashi from '../assets/fukidashi_small.png'
import styles from '../styles/ReviewTree.module.scss'
import BooksWrapper from './BooksWrapper'

const Reviewtree = () => {
    return (
        <div className={styles.reviewtree}>
            <div>
                <img
                    className={styles.reviewtree_pic}
                    src={review_tree}
                    alt="reviewtree"
                />
                <p className={styles.sentence_1}>NEKOさん</p>
                <p className={styles.sentence_2}>
                    北大OG　＋　文系からIT　＋　猫が好き
                </p>
                <div className={styles.icon_pic2}>
                    <img src={icon2} alt="TwitterIcon" />
                </div>
                <div className={styles.icon_pic1}>
                    <img src={icon1} alt="TwitterIcon" />
                </div>
                <div className={styles.fukidashi_small}>
                    <img src={fukidashi} alt="fukidashi" />
                    <p>フロントエンドがすごい人</p>
                </div>
            </div>
            <div className={styles.booksBlockInReview}>
                <BooksWrapper />
            </div>
        </div>
    )
}

export default Reviewtree
