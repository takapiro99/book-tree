import Image from 'next/image'
import LittleTree from '../components/LittleTree'
import styles from '../styles/Home.module.scss'
import StaffTree from '../public/images/home/booktree.png'
import top_1 from '../public/images/home/top_1.png'
import top_2 from '../public/images/home/top_2.png'
import top_3 from '../public/images/home/top_3.png'

/* eslint @next/next/no-img-element:0 */

export default function Home() {
    return (
        <div>
            <div>
                <div className={styles.topContent}>
                    <img
                        className={styles.topContent__staffTree}
                        src="/images/home/booktree.png"
                        alt="スタッフのブックツリー"
                    />
                    <div className={styles.topContent__introduce}>
                        <h1>周りにいる凄い人、</h1>
                        <h1>どんな本読んでいるんだろう？</h1>
                        あなたのすごいと思う人が読んでる本を集めてBOOKTREEをつくろう！
                        新しくやってみたいこと、ずっとやりたいと思っていたこと、知らなかったことに出会う機会
                        直接人と出会うことが難しい時代 新しい形でつながり学ぼう！
                    </div>
                </div>
                <h1 className={styles.topContentSteps__title}>どんなことができる？</h1>
                <div className={styles.topContent__steps}>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_1.png" alt="" />
                        </div>
                        <div className={styles.topContentSteps__explain}>BOOK TREEをつくろう</div>
                        <div className={styles.topContentSteps__explainS}>
                            無料でアカウントを作成して、BOOKTREEをつくろう
                        </div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_2.png" alt="" />
                        </div>
                        <div className={styles.topContentSteps__explain}>
                            すごい人にお願いして・・・
                        </div>
                        <div className={styles.topContentSteps__explainS}>
                            あなたの周りのすごいひとにおすすめの本を教えてもらおう
                        </div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>
                            <img src="/images/home/top_3.png" alt="" />
                        </div>
                        <div className={styles.topContentSteps__explain}>
                            たくさん本を実らせよう！
                        </div>
                        <div className={styles.topContentSteps__explainS}>
                            おすすめの本を教えてもらたら、その本があなたのツリーに実るよ。自分がお願いしてないすごいひとのレビューも実っちゃうかも？！
                        </div>
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
                <img className={styles.shiori} src="/images/home/shiori.png" alt="shiori" />
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
    )
}
