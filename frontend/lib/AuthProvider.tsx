import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import { FirestoreUser } from './firestore.interface'

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
    fireStoreUser: FirestoreUser | null
    setFireStoreUser: (user: FirestoreUser | null) => void
}

// provider の外側でcontextを絶対呼び出さないという意思の元
// https://reactjs.org/docs/context.html#reactcreatecontext
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserState>(null)
    const [isFirstLoading, setFirstLoading] = useState(true)
    const [isFetchingFirestoreUser, setFetchingFirestoreUser] = useState<boolean | undefined>(
        undefined
    )
    const [fireStoreUser, setFireStoreUser] = useState<FirestoreUser | null>(null)

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
            setFetchingFirestoreUser(undefined)
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
                fireStoreUser,
                setFireStoreUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
