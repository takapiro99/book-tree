import axios from 'axios'
import { useEffect, useState } from 'react'
import useDebounce from '../lib/useDebounce'
import styles from '../styles/ReviewForm.module.scss'
import BookOnBigTree from './BookOnBigTree'

// TODO: 見直す（直書きしてるが、用いるべき型は types.ts のどこかにある）
export interface BooksProps {
    // 本の画像、リンク、表示のさせ方（アイコンの場合アイコン画像とID）
    bookImageURL: string
    bookLink: string
    displayType: 'icon' | 'bookMark' | 'bookOnly'
    userIconImage?: string
    userID: string
}

interface IData {
    threeWords: string[]
    books: BooksProps[] //検索結果
    selectedBooks: string[] //レビュー用に選ばれたBooks
}

const initialData: IData = {
    threeWords: [],
    books: [
        {
            bookImageURL: '',
            displayType: 'bookOnly',
            bookLink: '',
            userID: ''
        }
    ],
    selectedBooks: []
}

const NewPost = () => {
    //保存するデータ
    const [data, setData] = useState<IData>(initialData)
    //const [books, setBooks] = useState<BooksProps[]>([])
    //保存しないデータ
    const [title, setTitle] = useState<string>('')

    const debouncedValue = useDebounce<string>(title, 400)

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${debouncedValue}`)
            .then((res: any) => {
                console.log(res.data.items)
                //帰ってきたデータからタイトルと画像データを取得し、
                //data内のbooksに入れる
            })
            .catch((err) => {
                alert(`err occurred: ${err}`)
            })
    }, [debouncedValue])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const name = event.target.name
        setData({ ...data, [name]: value })
        console.log(data)
    }
    const SearchBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    return (
        <div className={styles.reviewformWrapper}>
            <div>
                <form className="reviewform">
                    <div className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}>
                        <h2>本を選ぶ</h2>
                        <div className={styles.reviewformBookselect__block}>
                            <input
                                type="text"
                                className={styles.reviewformBookselect__input}
                                placeholder="本のタイトルを入力する"
                                name="searchBookTitle"
                                value={title}
                                onChange={SearchBooks}
                            />
                            {/* <div className={styles.reviewformBookselectResult}>
                                {data.books.length &&
                                    data.books.map((b) => {
                                        return (
                                            <div>
                                                <BookOnBigTree
                                                    bookImageURL={b.bookImageURL}
                                                    bookLink=""
                                                    displayType="bookOnly"
                                                    userID="sakusaku"
                                                />
                                                <div className={styles.plus}>
                                                    <i className="fas fa-plus-circle"></i>{' '}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div> */}
                        </div>
                    </div>
                    {/* {data?.selectedBooks.map((book) =>{
				return(
						<AddReview
						bookImageURL={data.selectedBook.bookImageURL}
						bookLink={data.book.bookLink}
						displayType={data.book.displayType}
						userID={data.book.userID}
						key={data.book.userID}
				/>
				)
		})
} */}
                    <div className={styles.reviewformSubmit}>
                        <button className={styles.submitButton}>決定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPost
