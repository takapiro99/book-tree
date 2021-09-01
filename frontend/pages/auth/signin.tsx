// import styles from '../../styles/Signin.module.scss'
import SignInWithTwitterOrGoogle from '../../components/auth/SignInWithTwitterOrGoogle'

/* eslint @next/next/no-img-element:0 */

// TODO: google のアイコンとかの利用規約とか調べる

const titleStyle = {
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '30px'
}

const SignIn = () => {
    // const context = useContext(AuthContext)
    // const router = useRouter()
    // if (context.currentUser) {
    //     router.push(`/${context.currentUser.uid}`)
    // }
    return (
        <div>
            <h1
                style={{
                    textAlign: 'center',
                    marginTop: '100px',
                    marginBottom: '30px'
                }}
            >
                BOOKTREEにログインする
            </h1>
            <SignInWithTwitterOrGoogle />
        </div>
    )
}

export default SignIn
