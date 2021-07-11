import LittleTree from '../components/LittleTree'
import styles from '../styles/top.module.scss'
import globalStyles from '../styles/Global.module.scss'
import StaffTree from '../assets/BOOKTREE.png'

const Top = () => {
    const today = '8/1'
    return (
        <div>
            <div className={globalStyles.wrapper}>
                <div className={styles.topContent}>
                    <img
                        className={styles.topContent__staffTree}
                        src={StaffTree}
                        alt="スタッフのブックツリー"
                    />
                    <div className={styles.topContent__introduce}>
                        <h1>すごい人</h1>
                        ***********************
                    </div>
                </div>
                <h1 className={styles.topContentSteps__title}>どんなことができる？</h1>
                <div className={styles.topContent__steps}>
                    
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>photo</div>
                        <div className={styles.topContentSteps__explain}>BOOK TREEをつくろう</div>
                        <div className={styles.topContentSteps__explainS}>無料でアカウントを作成して、BOOKTREEをつくろう</div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>photo</div>
                        <div className={styles.topContentSteps__explain}>すごい人にお願いして・・・</div>
                        <div className={styles.topContentSteps__explainS}>あなたの周りのすごいひとにおすすめの本を教えてもらおう</div>
                    </div>
                    <div className={styles.topContentSteps__block}>
                        <div className={styles.topContentSteps__photo}>photo</div>
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
            <h1 className={styles.BookTreeForest__title}>what's new?</h1>
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
export default Top
