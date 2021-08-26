import styles from '../styles/BookOnBigTree.module.scss'
import iconFox from '../public/images/foxIcon.png'
import Image from 'next/image'

// TODO: 本の表紙の画像が欲しいです
// TODO: アイコンがある場合とない場合で分岐したい
// TODO: レビューページの右上のまるがあるかないかの分岐

export interface BookOnBigTreeProps {
    // 本の画像、リンク、表示のさせ方（アイコンの場合アイコン画像とID）
    bookImageURL: string
    bookLink: string
    userIconImage?: string
    userID: string
}

const BookOnBigTree = (props: BookOnBigTreeProps) => {
    return (
        <div className={styles.booksWithIcon}>
            <div className={styles.booksBlock}>
                <div
                    className={`${styles.bookMark} ${styles.reviewpageReviewBook__bookMark}`}
                ></div>
                <div className={styles.bookLinkBlock}>
                    <a href={props.bookLink}>
                        <Image
                            src={props.bookImageURL}
                            className={styles.books}
                            alt="本の表紙画像"
                            objectFit="contain"
                            height={50}
                            width={50}
                        />
                    </a>
                </div>
                <div className={styles.booksBlock__account}>
                    <a href="#accont-review">
                        <Image className={styles.accountImg} src={iconFox} alt="アイコン画像" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BookOnBigTree
