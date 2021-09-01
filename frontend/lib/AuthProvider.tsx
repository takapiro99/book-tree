import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import firebase, { db } from './firebase'
import { UserInfo } from './types'

type UserState = firebase.User | null

type AuthContextType = {
    twitterLogin: () => Promise<void>
    googleLogin: () => Promise<void>
    signOut: () => Promise<void>
    currentUser: UserState
    isFirstLoading: boolean
    setFirstLoading: (loading: boolean) => void
    isFetchingFirestoreUser: boolean | undefined
    setFetchingFirestoreUser: (fetching: boolean | undefined) => void
    userInfo: UserInfo | null
    setUserInfo: (user: UserInfo | null) => void
    getMyFirebaseUser: (uid: string) => Promise<void>
}

// provider の外側でcontextを絶対呼び出さないという意思の元
// https://reactjs.org/docs/context.html#reactcreatecontext
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<UserState>(null)
    const [isFirstLoading, setFirstLoading] = useState(true)
    const [isFetchingFirestoreUser, setFetchingFirestoreUser] = useState<boolean | undefined>(
        undefined
    )
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    const cleanUp = () => {
        setCurrentUser(null)
        setFetchingFirestoreUser(undefined)
        setUserInfo(null)
    }

    const getMyFirebaseUser = async (uid: string) => {
        return db
            .collection('users')
            .where('uid', '==', uid)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.docs.length) {
                    alert('no corresponding user record found')
                    return
                } else if (querySnapshot.docs.length >= 2) {
                    alert(`${querySnapshot.docs.length} records have same uid`)
                    return
                }
                const profile = querySnapshot.docs[0].data() as UserInfo
                setUserInfo(profile)
                setFetchingFirestoreUser(false)
            })
            .catch((err) => {
                setFetchingFirestoreUser(false)
                alert(err)
            })
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
            alert('ログアウトに失敗しました。')
        }
    }

    // TODO: isFirstLoadingによってUIをいじる
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            setFirstLoading(false)
            setCurrentUser(user)
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
                userInfo,
                setUserInfo,
                getMyFirebaseUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
