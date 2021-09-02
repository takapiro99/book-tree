import Link from 'next/link'
import { useContext, cloneElement } from 'react'
import { AuthContext } from '../../lib/AuthProvider'

const GuardedRoute = ({ children, loading }: any) => {
    const { currentUser, isFirstLoading } = useContext(AuthContext)
    if (!isFirstLoading && !currentUser) {
        return <Link href="/auth/signin">sign in first.</Link>
    } else if (isFirstLoading) {
        return <></>
    }
    if (currentUser) {
        return cloneElement(children, isFirstLoading, currentUser) //children(currentUser, isFirstLoading)
    }
    throw new Error("couldn't guard route")
}

export default GuardedRoute
