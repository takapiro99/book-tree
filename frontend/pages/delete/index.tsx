import { deleteBookTree } from '../../lib/api'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../lib/AuthProvider'
import { useRouter } from 'next/router'
import styles from '../../styles/Delete.module.scss'
import { errorToast } from '../../lib/toasts'

/* eslint @next/next/no-img-element:0 */

export default function Delete() {
    const router = useRouter()
    const { currentUser, isFirstLoading } = useContext(AuthContext)

    const deleteBookTreeFunc = async () => {
        const isOk = await deleteBookTree()
        if (!isOk) {
            errorToast('削除に失敗しました！')
        } else {
            router.push('/delete/complete')
        }
    }

    useEffect(() => {
        if (!currentUser && !isFirstLoading) {
            router.push('/auth/signin/')
        }
    }, [currentUser, isFirstLoading]) // eslint-disable-line

    if (isFirstLoading) {
        return <p>Loading...</p>
    }

    if (currentUser) {
        return (
            <div>
                <div className="container">
                    <h1 className={styles.centerTitle}>BOOKTREEを削除する</h1>
                    <p className={styles.centerText}>アカウント情報とレビュー内容を削除します。</p>
                    <p className={styles.centerText}>参加してくれてありがとう！</p>
                    <div className={styles.deleteBtn} onClick={deleteBookTreeFunc}>
                        削除
                    </div>
                </div>
            </div>
        )
    }

    return null
}
