import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'
import NewPost from '../../components/NewPost'
import { checkInvitation } from '../../lib/api'
import { AuthContext } from '../../lib/AuthProvider'
import { Invitation } from '../../lib/types'
import styles from '../../styles/invitation.module.scss'
import Head from 'next/head'
/* eslint @next/next/no-img-element:0 */

// TODO: SSR にしたい

const InviteReview = () => {
    const [loadingInvitation, setLoadingInvitation] = useState<boolean>(true)
    const [invitation, setInvitation] = useState<Invitation | undefined>(undefined)
    const router = useRouter()
    const { currentUser, userInfo } = useContext(AuthContext)
    const { token } = router.query

    useEffect(() => {
        if (token) {
            checkInvitation(token as string)
                .then((invitation) => {
                    if (invitation) {
                        console.log(invitation)
                        setInvitation(invitation)
                    }
                    setLoadingInvitation(false)
                })
                .catch((err) => {
                    alert(err)
                    setLoadingInvitation(false)
                })
        }
        return () => {
            setInvitation(undefined)
        }
    }, [token]) // eslint-disable-line

    if (loadingInvitation) {
        return <p style={{ textAlign: 'center' }}>loading...</p>
    }

    return (
        <div className={styles.nominateBlock}>
            <Head>
                <title>InviteReview</title>
            </Head>
            <div className={styles.nominateReasonWrapper}>
                <h1 className={styles.nominateBlock__reason}>
                    デザインがすごいあなたに
                    <br />
                    おすすめの本を教えて
                    <br />
                    ほしーーーーーい！！
                </h1>
            </div>
            <div className={styles.nominateFromWho}>
                <div className={styles.icon}>
                    <img src="/images/foxIcon.png" alt="icon" />
                </div>
                <img src="/images/greencloud.png" alt="cloud" className={styles.greenCloud} />
            </div>
            <div className={styles.nominateExplation}>
                レビューを書いてくれると＊＊＊さんのBOOKTREEにあなたのレビューが実ります。
            </div>
            <div className={styles.reviewSteps}>
                <img src="/images/reviewImg.png" alt="レビューを書くと相手の木に実る" />
            </div>
            {/* TODO: ここにログインくん */}
            {!loadingInvitation && !invitation ? (
                <p>invalid invitation</p>
            ) : currentUser ? (
                <>
                    <NewPost />
                </>
            ) : (
                <div className={styles.accontCreateFromRecom}>
                    <div>
                        <h2 className={styles.title}>BOOKTREE を作る</h2>
                        <SignInWithTwitterOrGoogle />
                    </div>
                </div>
            )}
        </div>
    )
}

export default InviteReview
