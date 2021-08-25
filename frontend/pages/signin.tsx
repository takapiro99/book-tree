import { useContext } from 'react'
import styles from './auth/Signin.module.scss'
import { AuthContext } from '../src/lib/AuthProvider'

const SignIn = () => {
    const context = useContext(AuthContext)

    return (
        <div>
            <p className={styles.title}>BOOKTREEにログインする</p>
            <p className={styles.Twitter} onClick={context.twitterLogin}>
                Twitterアカウントでログイン
            </p>
            <p className={styles.Google} onClick={context.googleLogin}>
                Googleアカウントでログイン
            </p>
        </div>
    )
}

export default SignIn
