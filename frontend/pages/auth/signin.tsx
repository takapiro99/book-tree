import styles from '../../styles/Signin.module.scss'
import { useContext } from 'react'
import { AuthContext } from '../../lib/AuthProvider'
import { useRouter } from 'next/dist/client/router'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'

/* eslint @next/next/no-img-element:0 */

// TODO: google のアイコンとかの利用規約とか調べる

const SignIn = () => {
    const context = useContext(AuthContext)
    const router = useRouter()
    if (context.currentUser) {
        router.push(`/${context.currentUser.uid}`)
    }
    return (
        <div>
            <h1 className={styles.title}>BOOKTREEにログインする</h1>
            <SignInWithTwitterOrGoogle />
        </div>
    )
}

export default SignIn
