import review_tree from "../assets/review_tree.png";
import icon from "../assets/icon_LittleTree.png"

import styles from "../styles/ReviewTree.module.scss";


const Reviewtree = () => {
    return (
    
        <div className={styles.reviewtree}>
            <img className={styles.reviewtree_pic}src={review_tree} alt="reviewtree" />
            <p className={styles.sentence_1}>NEKOさん</p>
            <p className={styles.sentence_2}>北大OG　＋　文系からIT　＋　猫が好き</p>
            <div className={styles.icon_pic}><img  src={icon} alt="TwitterIcon" /></div>
        </div>
        
    );
};

export default Reviewtree;
