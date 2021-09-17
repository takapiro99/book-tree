// SSR無効化する場合
import dynamic from 'next/dynamic'
import { ReviewJoinedUser } from '../lib/types'

const SampleNoSSR = dynamic(() => import('./_ThreeTree'), { ssr: false })

const ThreeTree = ({ books }: { books: ReviewJoinedUser[] }) => <SampleNoSSR books={books} />

export default ThreeTree
