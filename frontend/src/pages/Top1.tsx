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
            </div>
            <div className={styles.greenbar}>
                <div className={styles.greenbar__icon}>what's new?</div>
                <div className={styles.circleDate}>
                    <div className={styles.circleDate__date}>{today}</div>
                </div>
            </div>
            <div className={styles.BookTreeForest}>
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
