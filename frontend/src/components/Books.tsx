import styles from "../styles/Books.module.scss";
import iconFox from "../assets/icon1.png";

// TODO: 本の表紙の画像が欲しいです
// TODO: アイコンがある場合とない場合で分岐したい　
// TODO: レビューページの右上のまるがあるかないかの分岐

export interface BooksProps {
    // 本の画像、リンク、表示のさせ方（アイコンの場合アイコン画像とID）
    bookImageURL: string
    bookLink: string
    displayType: "icon" | "bookMark" | "bookOnly"
    userIconImage?: string
    userID: string
}

const Books = (props: BooksProps) => {
    return (
        <div className={styles.booksWithIcon}>
            <div className={styles.booksBlock}>
            {
                    props.displayType === "bookMark" && 
                    <div className={`${styles.bookMark} ${styles.reviewpageReviewBook__bookMark}`}></div>
                }
                <a href={props.bookLink}><img src={props.bookImageURL} className={styles.books} alt="本の表紙画像"/></a>
                {
                    props.displayType === "icon" &&
                    <div className={styles.booksBlock__account}>
                        <a href="#accont-review">
                            <img className={styles.accountImg} src={iconFox} alt="アイコン画像" />
                        </a>
                    </div>
                }
            </div>
        </div>
    );
};

export default Books;