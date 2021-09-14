import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import firebase, { db } from './firebase'
import { errorToast } from './toasts'
import { UserInfo } from './types'

type UserState = firebase.User | null

type AuthContextType = {
    twitterLogin: () => Promise<void>
    googleLogin: () => Promise<void>
    signOut: () => Promise<void>
    currentUser: UserState
    isFirstLoading: boolean
    setFirstLoading: (loading: boolean) => void
    isFetchingFirestoreUser: boolean
    setFetchingFirestoreUser: (fetching: boolean) => void
    userInfo: UserInfo | null
}

// provider の外側でcontextを絶対呼び出さないという意思の元
// https://reactjs.org/docs/context.html#reactcreatecontext
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<UserState>(null)
    const [isFirstLoading, setFirstLoading] = useState(true)
    const [isFetchingFirestoreUser, setFetchingFirestoreUser] = useState<boolean>(true)
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    const cleanUp = () => {
        setCurrentUser(null)
        setFetchingFirestoreUser(true)
        setUserInfo(null)
    }

    // いつも userInfo をとりにいく
    // 初手の場合、userInfoがないので2秒後くらいにもういっかい見に行きたい
    // その場合、promise の待ち時間としてよい。
    // userInfoが0件だったらuidが間違ってるよねと。
    // たまにuserInfoが複数見つかる変なときがある
    const getMyFirebaseUser = async (uid: string): Promise<void> => {
        for (let i = 0; i < 3; i++) {
            try {
                const userQuerySnapshot = await db.collection('users').where('uid', '==', uid).get()
                const userDocs = userQuerySnapshot.docs
                if (userDocs.length >= 2) {
                    throw new Error(`${userDocs.length} records have same uid`)
                }
                if (!userDocs.length) {
                    if (i === 2) throw new Error('no corresponding user record found')
                    await new Promise((resolve) => setTimeout(resolve, 1500))
                    console.log(i)
                    continue
                }
                const profile = userDocs[0].data() as UserInfo
                setUserInfo(profile)
                setFetchingFirestoreUser(false)
                break
            } catch (error) {
                // どうしょうもないエラー
                setFetchingFirestoreUser(false)
                errorToast(error.toString())
            }
        }
    }

    const twitterLogin = async () => {
        const provider = new firebase.auth.TwitterAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }

    const googleLogin = async () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }

    const signOut = async () => {
        try {
            await firebase.auth().signOut()
            cleanUp()
            router.push('/')
        } catch (error) {
            errorToast('ログアウトに失敗しました。')
        }
    }

    // TODO: isFirstLoadingによってUIをいじる
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            setCurrentUser(user)
            setFirstLoading(false)
            if (user) {
                setFetchingFirestoreUser(true)
                getMyFirebaseUser(user.uid)
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                twitterLogin: twitterLogin,
                googleLogin: googleLogin,
                signOut: signOut,
                currentUser,
                isFirstLoading,
                setFirstLoading,
                isFetchingFirestoreUser,
                setFetchingFirestoreUser,
                userInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
