import { useContext } from 'react'
import styles from '../../styles/Signin.module.scss'
import { AuthContext } from '../../lib/AuthProvider'

/* eslint @next/next/no-img-element:0 */

const SignInWithTwitterOrGoogle = () => {
    const context = useContext(AuthContext)
    // const router = useRouter()
    // if (context.currentUser) {
    //     router.push(`/${context.currentUser.uid}`)
    // }
    return (
        <div>
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

export default SignInWithTwitterOrGoogle
