import { useState, useEffect } from 'react'
import styles from "../styles/Books.module.scss";
import Books, { BooksProps } from "../components/Books";
import { getBooks } from '../lib/index'

// 本をいい感じに横並びにするコンポーネント
// 本の表紙の画像が欲しいです
// 複数もらった画像をmapする
const BooksWrapper = () => {
  const [books, setBooks] = useState<BooksProps[]>([])
  useEffect(() => {
    const booksdata = getBooks("sakusaku", "icon")
    setBooks(booksdata)
    //console.log(booksdata)
  }, [])

  return (
    <div className={styles.books_wrapper}>
      {books.length && books.map((book) => {
        return(
        <Books bookImageURL={book.bookImageURL} bookLink={book.bookLink} displayType={book.displayType} userID={book.userID} key={book.userID}/>
      )})}
    </div>
  );
};

export default BooksWrapper;