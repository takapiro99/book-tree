import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useContext } from 'react'
import BigTreeWithBooks from '../../components/BigTreeWithBooks'
import Review from '../../components/Review'
import { AuthContext } from '../../src/lib/AuthProvider'
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
    if (!currentUser) {
        return (
            <div>
                <Link href="/auth/signin">sign in first</Link>
            </div>
        )
    }
    return (
        <div>
            <Review />
        </div>
    )
}

export default Mypage
