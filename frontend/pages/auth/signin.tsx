// import styles from '../../styles/Signin.module.scss'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useContext } from 'react'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'
import { AuthContext } from '../../lib/AuthProvider'

/* eslint @next/next/no-img-element:0 */

// TODO: google のアイコンとかの利用規約とか調べる

const titleStyle = {
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '30px'
}

const SignIn = () => {
    const context = useContext(AuthContext)
    const router = useRouter()
    if (context.currentUser) {
        router.push(`/${context.currentUser.uid}`)
    }
    // TODO: 既にサインインしていた場合どうするか考える
    return (
        <div>
            <Head>
                <title>SignIn</title>
            </Head>
            <h1
                style={{
                    textAlign: 'center',
                    marginTop: '100px',
                    marginBottom: '30px'
                }}
            >
                BOOKTREE にログインする
            </h1>
            <SignInWithTwitterOrGoogle />
        </div>
    )
}

export default SignIn
