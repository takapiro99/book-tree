import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { fetchBookListFromRakutenAPIByTitle, postReviewsInvitation } from '../lib/api'
import { PostReview, RakutenBookItem, RakutenResponse } from '../lib/types'
import useDebounce from '../lib/useDebounce'
import styles from '../styles/ReviewForm.module.scss'
import AddReview from './reviews/addReview'

/* eslint @next/next/no-img-element:0 */

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

const NewPost = ({ token }: { token: string }) => {
    const router = useRouter()
    //保存するデータ
    const [suggestions, setSuggestions] = useState<RakutenBookItem[]>([])
    const [selectedBooks, setSelectedBooks] = useState<RakutenBookItem[]>([])
    const [draftData, setDraftData] = useState<PostReview[]>([])
    const [posted, setPosted] = useState(false)
    // TODO: POSTするくん。ここのコンポーネントで 入力などを管理してやる？考える。
    //保存しないデータ
    const [title, setTitle] = useState<string>('')
    const debouncedValue = useDebounce<string>(title, 1000)

    const fetchSuggestions = () => {
        if (debouncedValue) {
            fetchBookListFromRakutenAPIByTitle(debouncedValue)
                .then((res) => {
                    console.log(res)
                    setSuggestions(res.Items)
                })
                .catch((err) => alert(err))
        } else {
            setSuggestions([])
        }
    }

    useEffect(() => {
        fetchSuggestions()
    }, [debouncedValue]) // eslint-disable-line

    const SearchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSelectSuggestion = (book: RakutenBookItem) => {
        setSuggestions([...suggestions].filter((b) => b.Item.itemUrl !== book.Item.itemUrl))
        setSelectedBooks([...selectedBooks, book])
    }

    // 一回選択したけど消すやつ
    const removeOnceSelectedBook = (book: RakutenBookItem) => {
        // TODO
    }

    const update = (index: number, data: PostReview) => {
        console.log(index, data)
        // deep copy したいだけ
        const draft = JSON.parse(JSON.stringify(draftData))
        draft[index] = data
        setDraftData(draft)
    }
    // TODO: ノラ
    const handlePost = () => {
        setPosted(true)
        postReviewsInvitation(draftData, token)
            .then((success) => {
                if (success) {
                    alert('投稿できました！')
                    router.push('/')
                }
                router.push('/')
            })
            .catch((e) => alert(`unknown error: ${e}`))
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
                            <div className={styles.reviewformBookselectResult}>
                                <div className={styles.suggestedBooksContainer}>
                                    {suggestions.length ? (
                                        suggestions.map((b, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={styles.suggestedBook}
                                                    onClick={() => handleSelectSuggestion(b)}
                                                >
                                                    <img src={b.Item.largeImageUrl} alt="" />
                                                    <div className={styles.plus}>
                                                        <FaPlusCircle size={35} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p>検索してね</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {selectedBooks.length ? (
                        selectedBooks.map((book, i) => {
                            return (
                                <AddReview
                                    index={i}
                                    book={book}
                                    key={book.Item.isbn}
                                    removeOnceSelectedBook={removeOnceSelectedBook}
                                    draftData={draftData}
                                    setDraftData={setDraftData}
                                    update={update}
                                />
                            )
                        })
                    ) : (
                        <p>選択してね</p>
                    )}
                    <div className={styles.reviewformSubmit}>
                        <button
                            className={styles.submitButton}
                            disabled={posted}
                            onClick={handlePost}
                        >
                            決定
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPost
