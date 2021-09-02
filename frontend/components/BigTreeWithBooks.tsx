import { useState, useEffect } from 'react'
import { getReviewsFromUser } from '../lib/api'
import styles from '../styles/BigTreeWithBooks.module.scss'
import BookOnBigTree from '../components/BookOnBigTree'

import { ReviewJoinedUser } from '../lib/types'

const BigTreeWithBooks = ({ uid }: { uid: string }) => {
    // 本をいい感じに横並びにするコンポーネント
    const [books, setBooks] = useState<ReviewJoinedUser[]>([])
    useEffect(() => {
        getReviewsFromUser(uid).then((books) => {
            if (books) {
                setBooks(books)
            }
        })
    }, [])

    return (
        <div>
            <div className={styles.BigTreeWrapper}>
                {/* icon */}
                <div className={styles.books_wrapper}>
                    {books.length ? (
                        books.map((book) => <BookOnBigTree review={book} key={book.user.uid} />)
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%' }}>
                            まだ booktree に本が生えていないようだ
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BigTreeWithBooks
