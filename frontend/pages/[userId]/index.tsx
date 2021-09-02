import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import Review from '../../components/Review'
import { AuthContext } from '../../lib/AuthProvider'

// TODO: 色々やる
// TODO: どこでユーザーが本物か確認する？

const Mypage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const isReady = router.isReady // routerの準備が完了したか
    const { userId } = router.query
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (isReady) {
            setLoading(false)
        }
    }, [loading, isReady])

    if (loading) {
        return <p>loading...</p>
    }

    // 型チェック
    if (userId === undefined || Array.isArray(userId)) {
        router.push('/404')
        return
    }
    // firestore の len(uid) は 28 らしい

    if (userId.length >= 33 || userId.length <= 26) {
        // invalid uid
        router.push('/404')
        return
    }

    if (currentUser?.uid === userId) {
        // 自分のマイページを見ている場合
        return (
            <GuardedRoute>
                <Review uid={userId} />
            </GuardedRoute>
        )
    } else {
        return <Review uid={userId} />
    }
}

export default Mypage
