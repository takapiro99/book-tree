import { useState, useEffect } from 'react'
import { getBookTree } from '../lib/api'
import styles from '../styles/BigTreeWithBooks.module.scss'
import BookOnBigTree from '../components/BookOnBigTree'

import { ReviewJoinedUser } from '../lib/types'
import { errorToast } from '../lib/toasts'

const BigTreeWithBooks = ({ uid }: { uid: string }) => {
    // 本をいい感じに横並びにするコンポーネント
    const [loading, setLoading] = useState<boolean>(true)
    const [books, setBooks] = useState<ReviewJoinedUser[]>([])
    useEffect(() => {
        getBookTree(uid)
            .then((books) => {
                if (books) {
                    setBooks(books)
                    setLoading(false)
                }
            })
            .catch((err) => {
                errorToast(err.toString())
            })
    }, [uid]) // eslint-disable-line

    return (
        <div className={styles.BigTreeWrapper}>
            {/* icon */}
            <div className={styles.books_wrapper}>
                {loading ? (
                    <p style={{ textAlign: 'center', width: '100%' }}>loading...</p>
                ) : books.length ? (
                    books.map((book, i) => <BookOnBigTree review={book} key={i} />)
                ) : (
                    <p style={{ textAlign: 'center', width: '100%' }}>
                        まだ booktree に本が生えていないようだ
                    </p>
                )}
            </div>
        </div>
    )
}

export default BigTreeWithBooks
