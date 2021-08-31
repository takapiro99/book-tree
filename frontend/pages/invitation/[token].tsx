import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'
import { checkInvitation } from '../../lib/api'
import styles from '../../styles/invitation.module.scss'

/* eslint @next/next/no-img-element:0 */

const InviteReview = () => {
    const router = useRouter()
    const { token } = router.query
    useEffect(() => {
        return () => {}
        checkInvitation(token as string).then((invitation) => {
            if (invitation) {
                console.log(invitation)
            }
        })
    }, [])
    return (
        <div>
            <div className={styles.nominateBlock}>
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
                <div className={styles.accontCreateFromRecom}>
                    <div>
                        <h2 className={styles.title}>BOOKTREE を作る</h2>
                        <SignInWithTwitterOrGoogle />
                    </div>
                </div>
                {/* TODO: ログインしてたら、新規投稿フォームも出す */}
            </div>
        </div>
    )
}

export default InviteReview
