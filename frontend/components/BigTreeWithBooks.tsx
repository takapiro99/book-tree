import { useState, useEffect } from 'react'
import { getBooks } from '../lib/api'
import styles from '../styles/BigTreeWithBooks.module.scss'
import BookOnBigTree, { BookOnBigTreeProps } from '../components/BookOnBigTree'

const BigTreeWithBooks = () => {
    // 本をいい感じに横並びにするコンポーネント
    // 本の表紙の画像が欲しいです
    // 複数もらった画像をmapする
    const [books, setBooks] = useState<BookOnBigTreeProps[]>([])
    useEffect(() => {
        const booksdata = getBooks('sakusaku', 'icon')
        setBooks(booksdata)
        //console.log(booksdata)
    }, [])

    return (
        <div>
            <div className={styles.BigTreeWrapper}>
                {/* icon */}
                <div className={styles.books_wrapper}>
                    {books.length &&
                        books.map((book) => {
                            return (
                                <BookOnBigTree
                                    bookImageURL={book.bookImageURL}
                                    bookLink={book.bookLink}
                                    displayType={book.displayType}
                                    userID={book.userID}
                                    key={book.userID}
                                />
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default BigTreeWithBooks
