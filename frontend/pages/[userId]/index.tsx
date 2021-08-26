import { useRouter } from 'next/dist/client/router'
import BigTreeWithBooks from '../../components/BigTreeWithBooks'
import Custom404 from '../404'

interface RouteParams {
    id: string
}

// TODO: 色々やる

const Mypage = () => {
    const router = useRouter()
    const { userId } = router.query
    if (userId && userId[0] !== '@') {
        console.log('invalid route')
        return <Custom404 />
    }
    return (
        <div>
            mypage
            <p>hello, {userId} さん</p>
            <BigTreeWithBooks />
        </div>
    )
}

export default Mypage
