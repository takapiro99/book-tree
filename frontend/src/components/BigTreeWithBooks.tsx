import BigTree from "../assets/BOOKTREE.png";
import styles from "../styles/BigTreeWithBooks.module.scss";

const BigTreeWithBooks = () => {
  return (
    <div>
      <div>ここが木のコンポーネント</div>
      <img className={styles.bigtree} src={BigTree} alt="green big tree" />
      <p>2+3</p>
      <p>{2 + 3}</p>
    </div>
  );
};

export default BigTreeWithBooks;
