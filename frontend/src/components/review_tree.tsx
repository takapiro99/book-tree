import review_tree from "../assets/review_tree.png";

import styles from "../styles/ReviewTree.module.scss";


const Reviewtree = () => {
    return (
    <div>
        <img className={styles.review_tree}src={review_tree} alt="reviewtree" />
    </div>
    );
};

export default Reviewtree;
