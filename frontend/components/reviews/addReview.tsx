// TODO: ただコピペしただけ

import { useEffect } from 'react'
import { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { PostReview, RakutenBookItem } from '../../lib/types'
import styles from '../../styles/ReviewForm.module.scss'

// TODO: tons of refactoring
// TODO: react-hooks-form を使っていないので使いたい

interface AddReviewProps {
    book: RakutenBookItem
    removeOnceSelectedBook: (book: RakutenBookItem) => void
    index: number
    draftData: Array<any>
    setDraftData: (data: any) => void
    update: (index: number, data: PostReview) => void
}

/* eslint @next/next/no-img-element:0 */

// content: string
// reason: string
// isbn: string

const AddReview = (props: AddReviewProps) => {
    const { book, removeOnceSelectedBook, draftData, setDraftData, update, index } = props
    const [content, setContent] = useState<string>('')
    // TODO: デフォルト値なんとかする
    const [reason, setReason] = useState<string>('難しいけどおすすめ')

    useEffect(() => {
        update(index, { content: content, reason: reason, isbn: book.Item.isbn })
    }, [content, reason]) // eslint-disable-line

    return (
        <div className={`${styles.reviewformAddreview} ${styles.blockbtwMd}`}>
            <div className={styles.reviewformAddreviewBooks}>
                <img src={book.Item.largeImageUrl} alt="" className={styles.selectedBookImage} />
                {/* <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" /> */}
                <div className={styles.plus}>
                    <FaPlusCircle />
                </div>
            </div>
            <div className={styles.reviewformAddreviewReview}>
                <div className={styles.reviewformAddreviewReview__reason}>
                    <select onChange={(e) => setReason(e.target.value)}>
                        <option defaultValue="**を始めたい人におすすめ">
                            **を始めたい人におすすめ
                        </option>
                        <option value="影響を受けたのはこの本！">影響を受けたのはこの本！</option>
                        <option value="難しいけどおすすめ">難しいけどおすすめ</option>
                        <option value="一番">一番</option>
                    </select>
                </div>
                <textarea
                    className={styles.reviewformAddreviewReview__review}
                    placeholder="レビューを入力してください"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    )
}

export default AddReview
