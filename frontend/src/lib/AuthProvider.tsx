import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import { User } from '@firebase/auth-types'

type UserState = User | null | undefined
type NavMenuState = boolean | null | undefined
type AuthContextType = {
    twitterLogin: (() => Promise<void>) | undefined
    googleLogin: (() => Promise<void>) | undefined
    signOut: () => Promise<void>
    currentUser: UserState
    isNavMenuOpen: NavMenuState
    setNavMenuOpen: (isOpen: boolean) => void
}

export const AuthContext = React.createContext<AuthContextType>({
    twitterLogin: undefined,
    googleLogin: undefined,
    signOut: async () => {},
    currentUser: undefined,
    isNavMenuOpen: false,
    setNavMenuOpen: () => {}
})

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserState>(null)
    const [isNavMenuOpen, setNavMenuOpen] = useState<NavMenuState>(false)

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
        } catch (error) {
            alert('ログアウトに失敗しました。')
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                twitterLogin: twitterLogin,
                googleLogin: googleLogin,
                signOut: signOut,
                currentUser,
                isNavMenuOpen,
                setNavMenuOpen
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
