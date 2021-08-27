import styles from '../styles/BookOnBigTree.module.scss'
import iconFox from '../public/images/foxIcon.png'
import Image from 'next/image'

import { ReviewJoinedUser } from '../lib/types'

// TODO: book on big tree 以外でもこのコンポーネントを使おうと思うので、 rename する

// TODO: 本の表紙の画像が欲しいです
// TODO: アイコンがある場合とない場合で分岐したい
// TODO: レビューページの右上のまるがあるかないかの分岐

/*  eslint @next/next/no-img-element:0 */
export interface BookOnBigTreeProps extends ReviewJoinedUser {
    // 本の画像、リンク、表示のさせ方（アイコンの場合アイコン画像とID）
    withYellowBackground?: boolean
}

const BookOnBigTree = (props: BookOnBigTreeProps) => {
    return (
        <div className={styles.booksWithIcon}>
            <div className={styles.booksBlock}>
                {props.withYellowBackground && (
                    <div
                        className={`${styles.bookMark} ${styles.reviewpageReviewBook__bookMark}`}
                    ></div>
                )}
                <div className={styles.bookLinkBlock}>
                    <a href={props.bookLink}>
                        <img src={props.bookImageURL} className={styles.books} alt="本の表紙画像" />
                    </a>
                </div>
                {!props.withYellowBackground && (
                    <div className={styles.booksBlock__account}>
                        <a href="#accont-review">
                            <img
                                className={styles.accountImg}
                                src="/images/foxIcon.png"
                                alt="アイコン画像"
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookOnBigTree
