import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'
import NewPost from '../../components/NewPost'
import { checkInvitation, getUserInfo } from '../../lib/api'
import { AuthContext } from '../../lib/AuthProvider'
import { Invitation, UserInfo } from '../../lib/types'
import styles from '../../styles/invitation.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import { errorToast } from '../../lib/toasts'
/* eslint @next/next/no-img-element:0 */

// TODO: SSR にしたい

export const NORA_QUERY = 'new'

const InviteReview = () => {
    const [loadingInvitation, setLoadingInvitation] = useState<boolean>(true)
    const [invitation, setInvitation] = useState<Invitation | undefined>(undefined)
    const [inviter, setInviter] = useState<UserInfo | undefined>(undefined)
    const [err, setErr] = useState('')
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)
    const { token } = router.query

    const isInvalidInvitation = !loadingInvitation && !invitation && token !== NORA_QUERY
    const isNora = !invitation && !loadingInvitation && token === NORA_QUERY
    const wasValidInvitation = !isInvalidInvitation
    useEffect(() => {
        if (token) {
            if (token === NORA_QUERY) {
                setLoadingInvitation(false)
            } else {
                checkInvitation(token as string)
                    .then((invitation) => {
                        if (invitation) {
                            setInvitation(invitation)
                        }
                        setErr(err)
                        setLoadingInvitation(false)
                    })
                    .catch((err) => {
                        setErr(err)
                        errorToast(err)
                        setLoadingInvitation(false)
                    })
            }
        }
        return () => {
            setInvitation(undefined)
        }
    }, [token]) // eslint-disable-line

    useEffect(() => {
        if (invitation) {
            getUserInfo(invitation.from).then((user) => {
                if (user) {
                    setInviter(user)
                }
            })
        }
    }, [invitation])

    if (loadingInvitation) {
        return <p style={{ textAlign: 'center' }}>loading...</p>
    }

    if (err || isInvalidInvitation) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p>無効な招待です</p>
                <p>
                    <Link href="/">Top に戻る</Link>
                </p>
            </div>
        )
    }

    return (
        <div className={`${styles.nominateBlock} container`}>
            <Head>
                <title>InviteReview</title>
            </Head>
            <div className={styles.nominateReasonWrapper}>
                {!isNora ? (
                    <h2 className={styles.nominateBlock__reason}>
                        {invitation?.specialty} がすごいあなたに
                        <br />
                        おすすめの本を教えて
                        <br />
                        ほしーーーーーい！！
                    </h2>
                ) : (
                    <h2 className={styles.nominateBlock__reason}>
                        おすすめの本を教えて
                        <br />
                        ほしーーーーーい！！
                    </h2>
                )}
            </div>
            <div className={styles.nominateFromWho}>
                {invitation ? (
                    <>
                        <div className={styles.icon}>
                            <img src={inviter?.profileImage} alt="icon" />
                        </div>
                        <img
                            src="/images/greencloud.png"
                            alt="cloud"
                            className={styles.greenCloud}
                        />
                    </>
                ) : null}
            </div>
            {isNora ? (
                <div className={styles.nominateExplation}>レビューを書いちゃう？</div>
            ) : (
                <>
                    <div className={styles.nominateExplation}>
                        レビューを書いてくれると{' '}
                        <span style={{ fontSize: '130%' }}>
                            {inviter ? inviter.displayName : '&nbsp;'}
                        </span>{' '}
                        さんのBOOKTREEにあなたのレビューが実ります。
                    </div>
                    <div className={styles.reviewSteps}>
                        <img src="/images/reviewImg.png" alt="レビューを書くと相手の木に実る" />
                    </div>
                </>
            )}
            {currentUser ? (
                isNora ? (
                    <NewPost token={NORA_QUERY} />
                ) : (
                    invitation?.token && <NewPost token={invitation.token as string} />
                )
            ) : loadingInvitation ? (
                <p>loading</p>
            ) : isNora ? (
                <div className={styles.accontCreateFromRecom}>
                    <div>
                        <h2 className={styles.title}>BOOKTREE を作る</h2>
                        <SignInWithTwitterOrGoogle />
                    </div>
                </div>
            ) : (
                invitation?.token && <NewPost token={invitation.token as string} />
            )}
        </div>
    )
}

export default InviteReview
