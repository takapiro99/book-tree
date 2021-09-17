import { useRef, useState } from 'react'
import { FaBackward, FaCheck, FaRegEdit, FaRemoveFormat } from 'react-icons/fa'
import { MdCancel, MdDelete } from 'react-icons/md'
import { infoToast } from '../lib/toasts'
import { ReviewJoinedUser } from '../lib/types'
import styles from '../styles/Review.module.scss'
import BookOnBigTree from './BookOnBigTree'

const BookWithReview = ({ review, isMe = false }: { review: ReviewJoinedUser; isMe?: boolean }) => {
    const [editing, setEditing] = useState(false)
    const ref = useRef<any>(null)
    const handleChange = () => {
        console.log('hi')
    }
    const handleTitleChange = (e: any) => {
        console.log(e.target.value)
    }
    const handleTextChange = (e: any) => {
        console.log(e.target.value)
    }
    const handleCancelEditing = () => {
        setEditing(false)
    }

    const handleCommitEdit = () => {
        setEditing(false)
    }

    const handleStartEdit = () => {
        infoToast('ごめんね！編集機能は実装中だよ！')
        // setEditing(true)
        ref.current.focus()
    }

    return (
        <div className={`${styles.reviewpageReviewBlock} container`}>
            <div className={styles.reviewpageReviewBook}>
                <BookOnBigTree withYellowBackground review={review} />
            </div>
            <div className={styles.reviewpageReviewContent}>
                <input
                    ref={ref}
                    disabled={!editing}
                    style={{ display: 'block', width: '100%' }}
                    type="text"
                    value={review.reason}
                    className={styles.reviewpageReviewContent__reason}
                    onChange={handleTitleChange}
                />
                <textarea
                    disabled={!editing}
                    style={{ display: 'block', width: '100%' }}
                    value={review.content}
                    onChange={handleTextChange}
                    className={styles.reviewpageReviewContent__comment}
                />
            </div>
            <div className={styles.reviewpageReviewEdit}>
                {isMe &&
                    (editing ? (
                        <div>
                            <p
                                className={styles.reviewpageReviewEditAction}
                                onClick={handleCancelEditing}
                            >
                                <MdCancel size={18} color="grey" />
                            </p>
                            <p
                                className={styles.reviewpageReviewEditAction}
                                onClick={handleCommitEdit}
                            >
                                <FaCheck size={20} color="grey" />
                            </p>
                        </div>
                    ) : (
                        <>
                            <div onClick={handleStartEdit}>
                                <p
                                    className={styles.reviewpageReviewEditAction}
                                    onClick={handleCancelEditing}
                                >
                                    <FaRegEdit size={23} color="grey" />
                                </p>
                            </div>
                            <div onClick={() => infoToast('削除機能は実装中だよ！ごめんね！')}>
                                <p
                                    className={styles.reviewpageReviewEditAction}
                                    onClick={handleCommitEdit}
                                >
                                    <MdDelete size={23} color="grey" />
                                </p>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default BookWithReview
