import styles from '../styles/Setting.module.scss'

import Books from '../components/Books'
import AddReview from '../components/AddReview'
import globalStyles from '../styles/Global.module.scss'
import { useEffect, useState } from 'react'
import { BooksProps } from '../components/Books'
import axios from 'axios'
import useDebounce from '../lib/useDebounce'

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

const Setting = () => {
    //保存するデータ
    const [data, setData] = useState<IData>(initialData)
    //const [books, setBooks] = useState<BooksProps[]>([])
    //保存しないデータ
    const [title, setTitle] = useState<string>('')

    const debouncedValue = useDebounce<string>(title, 400)

    useEffect(() => {
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${debouncedValue}`
            )
            .then((res) => {
                console.log(res.data.items)
                //帰ってきたデータからタイトルと画像データを取得し、
                //data内のbooksに入れる
            })
            .catch((error) => {
                // alert('err occurred')
                console.error(error)
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
            <div className={globalStyles.wrapper}>
                <form className="reviewform">
                    <div
                        className={`${styles.reviewformName} ${styles.blockbtwMd}`}
                    >
                        <div className={styles.reviewformName__block}>
                            <div className={styles.reviewformName__namewrapper}>
                                <div className={styles.reviewformName__name}>
                                    Nameさん
                                </div>
                            </div>
                            <div className={styles.reviewformName__icon}></div>
                        </div>
                    </div>
                    <div className={styles.blockbtwMd}>
                        <div className={styles.reviewform3keywords}>
                            <h2>3つのキーワード</h2>
                            <div
                                className={styles.reviewform3keywords__example}
                            >
                                例：北大2年 + カフェが好き + 漫画が好き
                            </div>
                            <div className={styles.reviewform3keywords__list}>
                                <input
                                    className={styles.reviewform3keywords__3box}
                                    name="threeWords"
                                    value={data.threeWords[0]}
                                    onChange={handleChangeInput}
                                />{' '}
                                <span className={styles.reviewform__plus}>
                                    <i className="fas fa-plus"></i>{' '}
                                </span>
                                <input
                                    className={styles.reviewform3keywords__3box}
                                    name="threeWords"
                                    value={data.threeWords[1]}
                                    onChange={handleChangeInput}
                                />{' '}
                                <span className={styles.reviewform__plus}>
                                    <i className="fas fa-plus"></i>
                                </span>
                                <input
                                    className={styles.reviewform3keywords__3box}
                                    name="threeWords"
                                    value={data.threeWords[2]}
                                    onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}
                    ></div>

                    <div className={styles.reviewformSubmit}>
                        <button className={styles.submitButton}>決定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Setting
