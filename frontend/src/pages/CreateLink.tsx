import globalStyles from '../styles/Global.module.scss'
import styles from "../styles/createLink.module.scss"
import Iconpic from '../components/Iconpic'

const CreateLink = () => {
    return <div className={globalStyles.wrapper}>

        <div className={styles.nominateBlock}>
            <div className={styles.nominateReasonWrapper}>
            <h1 className={styles.nominateBlock__reason}>
                デザインがすごいあなたに<br/>おすすめの本をとっても教えてほしーーーーーい！
            </h1>
            </div>

            <div className={styles.nominateFromWho}>
                <Iconpic />
            </div>

            <div　className={styles.nominateExplation}>
                あなたがレビューを書いてくれると＊＊＊さんのBOOKTREEにあなたのレビューが実ります。
            </div>
        

        <div className={styles.reviewSteps}>
            <div>explation1</div>
            <div>2</div>
        </div>
        <div className={styles.accontCreateFromRecom}>createここにアカウント作るを入れる</div>


        </div>
    </div>
}

export default CreateLink
