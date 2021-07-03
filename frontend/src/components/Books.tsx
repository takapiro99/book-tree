import styles from "../styles/Books.module.scss";
import iconFox from "../assets/icon_LittleTree.png";

// 本の表紙の画像が欲しいです
// アイコンがある場合とない場合で分岐したい　
// 現在はライオンで代用中
const Books = () => {
    const icon = true
    if (icon){
        return (
            <div className={styles.booksWithIcon}>
            <div className={styles.booksBlock}>
            <div className={styles.books}>book</div>
                <div className={styles.booksBlock__account}>
                        <a href="#accont-review">
                            <img className={styles.accountImg} src={iconFox} alt="アイコン画像"  />
                        </a> 
                </div>
            </div>
            </div>
            );
    }else{
        return (
            <div className={styles.books_block}>
            <div className={styles.books}>book</div>
            </div>
  );}
};
export default Books;

