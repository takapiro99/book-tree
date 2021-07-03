import styles from "../styles/Books.module.scss";
import Books from "../components/Books";

// 本をいい感じに横並びにするコンポーネント
// 本の表紙の画像が欲しいです
// 複数もらった画像をmapする
const BooksWrapper = () => {
  return (
    <div className={styles.books_wrapper}>
      <Books />
      <Books />
      <Books />
      <Books />
      <Books />
    </div>
  );
};
export default BooksWrapper;
