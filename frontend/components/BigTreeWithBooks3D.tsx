import { useState, useEffect } from 'react'
import { getBookTree } from '../lib/api'
import styles from '../styles/BigTreeWithBooks.module.scss'
import BookOnBigTree from '../components/BookOnBigTree'
import ThreeTree from './ThreeTree'

import { ReviewJoinedUser } from '../lib/types'
import { errorToast } from '../lib/toasts'

const BigTreeWithBooks3D = ({ uid }: { uid: string }) => {
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
        <div className={styles.BigTreeWrapper3D}>
            <ThreeTree books={books}></ThreeTree>
        </div>
    )
}

export default BigTreeWithBooks3D
