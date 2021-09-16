// SSR無効化する場合
import dynamic from 'next/dynamic'

const SampleNoSSR = dynamic(() => import('./_ThreeTree'), { ssr: false })

const ThreeTree = () => <SampleNoSSR hoge={true} />

export default ThreeTree
