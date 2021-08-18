import Image from 'next/image'
import LittleTree from '../components/LittleTree'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
        <div>
            <div className={"wrapper"}>
                <div className={styles.topContent}>
                    <Image
                        className={styles.topContent__staffTree}
                        src="/images/home/booktree.png"
                        alt="スタッフのブックツリー"
                        layout='fill'
                        objectFit='contain'
                    />
                    <div className={styles.topContent__introduce}>
                        <h1>すごい人</h1>
                        ***********************
                    </div>
                </div>
                <h1 className={styles.topContentSteps__title}>どんなことができる？</h1>
                <div className={styles.topContent__steps}>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}><Image src="/images/home/top_1.png" alt="" layout='fill' objectFit='contain' /></div>
                        <div className={styles.topContentSteps__explain}>BOOK TREEをつくろう</div>
                        <div className={styles.topContentSteps__explainS}>無料でアカウントを作成して、BOOKTREEをつくろう</div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}><Image src='/images/home/top_2.png' alt="" layout='fill' objectFit='contain' /></div>
                        <div className={styles.topContentSteps__explain}>すごい人にお願いして・・・</div>
                        <div className={styles.topContentSteps__explainS}>あなたの周りのすごいひとにおすすめの本を教えてもらおう</div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}><Image src="/images/home/top_3.png" alt="" layout='fill' objectFit='contain' /></div>
                        <div className={styles.topContentSteps__explain}>たくさん本を実らせよう！</div>
                        <div className={styles.topContentSteps__explainS}>おすすめの本を教えてもらたら、その本があなたのツリーに実るよ。自分がお願いしてないすごいひとのレビューも実っちゃうかも？！</div>
                    </div>

                </div>
            </div>
            <div className={styles.greenbar}>
                
                {/* <div className={styles.circleDate}>
                    <div className={styles.circleDate__date}>{today}</div>
                </div> */}
            </div>
            <div className={styles.BookTreeForest}>
            <h1 className={styles.BookTreeForest__title}>what&apos;s new?</h1>
                <div className={styles.forestWrapper}>
                    <div className={styles.littletreeWrapper}>
                        <LittleTree />
                        <LittleTree />

                        <LittleTree />
                    </div>
                    <div className={styles.littletreeWrapper2}>
                        <LittleTree />
                        <LittleTree />
                        <LittleTree />
                    </div>
                    <div className={styles.littletreeWrapper3}>
                        <LittleTree />
                        <LittleTree />
                        <LittleTree />
                    </div>
                </div>
            </div>
            <div className={styles.greenbar2}> </div>
        </div>
    </div>
  )
}
