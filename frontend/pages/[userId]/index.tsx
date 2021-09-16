import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import GuardedRoute from '../../components/auth/GuardedRoute'
import Review from '../../components/Review'
import { AuthContext } from '../../lib/AuthProvider'
import { createTitle } from '../../lib/util'

// TODO: 色々やる
// TODO: どこでユーザーが本物か確認する？

const Mypage = () => {
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(true)
    const [displayName, setDisplayName] = useState('...')
    const { userId } = router.query
    const isReady = router.isReady // routerの準備が完了したか

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
            <>
                <Head>{createTitle(displayName)}</Head>
                <GuardedRoute>
                    <Review uid={userId} isMe={true} setDisplayName={setDisplayName} />
                </GuardedRoute>
            </>
        )
    } else {
        return (
            <>
                <Head>{createTitle(displayName)}</Head>
                <Review uid={userId} setDisplayName={setDisplayName} />
            </>
        )
    }
}

export default Mypage
