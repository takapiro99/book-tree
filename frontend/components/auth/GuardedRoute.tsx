import { useContext } from 'react'
import { AuthContext } from '../../lib/AuthProvider'

const GuardedRoute = ({ children, loading }: any) => {
    const { currentUser, isFirstLoading } = useContext(AuthContext)
    return children
}

export default GuardedRoute
