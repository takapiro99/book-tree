import React, { useEffect, useState } from 'react'
import firebase from './firebase'

export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser]: any = useState(null)

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
            alert("ログアウトに失敗しました。")
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
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
