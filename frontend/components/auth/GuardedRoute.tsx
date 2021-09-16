import Link from 'next/link'
import React, { useContext, cloneElement } from 'react'
import { AuthContext } from '../../lib/AuthProvider'

interface GuardedRouteProps {
    waitFirestoreLoading?: boolean
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ children, waitFirestoreLoading = false }) => {
    const { currentUser, isFirstLoading, isFetchingFirestoreUser, userInfo } =
        useContext(AuthContext)
    if (!isFirstLoading && !currentUser) {
        return <Link href="/auth/signin">sign in first.</Link>
    } else if (isFirstLoading) {
        return <></>
    }
    
    if (currentUser) {
        if (!waitFirestoreLoading) {
            return <>{children}</>
        }

        // firestoreデータを取得中
        if (isFetchingFirestoreUser) {
            return <></>
        }

        if (userInfo) {
            return <>{children}</>
        }
    }

    throw new Error("couldn't guard route")
}

export default GuardedRoute
