import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useContext } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import BigTreeWithBooks from '../../components/BigTreeWithBooks'
import Review from '../../components/Review'
import { AuthContext } from '../../lib/AuthProvider'

// TODO: 色々やる
// TODO: どこでユーザーが本物か確認する？

const Mypage = () => {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)
    const { userId } = router.query
    if (currentUser && currentUser.uid === userId) {
        // 自分のマイページを見ている場合
        return (
            <GuardedRoute>
                <Review uid={userId} />
            </GuardedRoute>
        )
    } else {
        return <Review uid={userId as string} />
    }
}

export default Mypage
