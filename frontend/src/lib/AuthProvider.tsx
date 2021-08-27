import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import { User } from '@firebase/auth-types'

type UserState = User | null | undefined
type NavMenuState = boolean | null | undefined
type AuthContextType = {
    twitterLogin: () => Promise<void>
    googleLogin: () => Promise<void>
    signOut: () => Promise<void>
    currentUser: UserState
}

export const AuthContext = React.createContext<AuthContextType>({
    twitterLogin: async () => {},
    googleLogin: async () => {},
    signOut: async () => {},
    currentUser: undefined
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

    // TODO: 一番最初にユーザー検知するまで loading ってことにしといたほうがよさそう(UIがかくつく)
    // TODO: でも、ログインしてなかったら永遠に loading になっちゃいそうなのでどうすればいいかわかんない
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
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
