import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useContext } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import BigTreeWithBooks from '../../components/BigTreeWithBooks'
import Review from '../../components/Review'
import { AuthContext } from '../../lib/AuthProvider'
import Custom404 from '../404'

interface RouteParams {
    id: string
}

// TODO: 色々やる
// TODO: どこでユーザーが本物か確認する？

const Mypage = () => {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)
    const { userId } = router.query
    // if (userId && userId[0] !== '@') {
    //     console.log('invalid route')
    //     return <Custom404 />
    // }

    // if (!currentUser) {
    //     return (
    //         <div>
    //             <Link href="/auth/signin">sign in first</Link>
    //         </div>
    //     )
    // }
    return (
        <GuardedRoute>
            <div>
                <Review />
            </div>
        </GuardedRoute>
    )
}

export default Mypage
