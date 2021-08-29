import styles from './Signin.module.scss'
import { useContext } from 'react'
import { AuthContext } from '../../lib/AuthProvider'
import { useRouter } from 'next/dist/client/router'

/* eslint @next/next/no-img-element:0 */

// TODO: google のアイコンとかの利用規約とか調べる

const SignIn = () => {
    const context = useContext(AuthContext)
    const router = useRouter()
    if (context.currentUser) {
        router.push(`/@${context.currentUser.uid}`)
    }
    return (
        <div>
            <h1 className={styles.title}>BOOKTREEにログインする</h1>
            <p className={`${styles.Twitter} ${styles.icon}`} onClick={context.twitterLogin}>
                <img
                    src="/twitter-blue.svg"
                    alt="twitter icon"
                    height={35}
                    style={{ display: 'inline-block', marginRight: '15px' }}
                />
                twitter で続ける
            </p>
            <p className={`${styles.Google} ${styles.icon}`} onClick={context.googleLogin}>
                Googleアカウントでログイン
            </p>
        </div>
    )
}

export default SignIn
