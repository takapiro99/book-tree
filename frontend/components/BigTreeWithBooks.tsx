import { useState, useEffect } from 'react'
import { fetchBooksEachUser } from '../lib/api'
import styles from '../styles/BigTreeWithBooks.module.scss'
import BookOnBigTree from '../components/BookOnBigTree'

import { ReviewJoinedUser } from '../lib/types'

const BigTreeWithBooks = () => {
    // 本をいい感じに横並びにするコンポーネント
    // 本の表紙の画像が欲しいです
    // 複数もらった画像をmapする
    const [books, setBooks] = useState<ReviewJoinedUser[]>([])
    useEffect(() => {
        fetchBooksEachUser('sakusaku').then((booksdata) => {
            if (booksdata) {
                setBooks(booksdata)
            }
        })

        //console.log(booksdata)
    }, [])

    return (
        <div>
            <div className={styles.BigTreeWrapper}>
                {/* icon */}
                <div className={styles.books_wrapper}>
                    {books.length &&
                        books.map((book) => {
                            return <BookOnBigTree review={book} key={book.user.uid} />
                        })}
                </div>
            </div>
        </div>
    )
}

export default BigTreeWithBooks
