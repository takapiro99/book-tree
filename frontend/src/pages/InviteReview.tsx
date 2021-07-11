import globalStyles from '../styles/Global.module.scss'
import styles from "../styles/InviteReview.module.scss"
import Iconpic from '../components/Iconpic'
import greencloud from '../assets/greencloud.png'

const InviteReview = () => {
    return <div className={globalStyles.wrapper}>

        <div className={styles.nominateBlock}>
            <div className={styles.nominateReasonWrapper}>
            <h1 className={styles.nominateBlock__reason}>デザインがすごいあなたに<br/>おすすめの本を教えて<br/>ほしーーーーーい！！
            </h1>
            </div>

            <div className={styles.nominateFromWho}>
                <Iconpic />
                
                <img src={greencloud} alt="cloud" className={styles.greenCloud}/>
                
            </div>

            <div　className={styles.nominateExplation}>
                レビューを書いてくれると＊＊＊さんのBOOKTREEにあなたのレビューが実ります。
            </div>
        

        <div className={styles.reviewSteps}>
            <div>explation1</div>
            <div>2</div>
        </div>
        <div className={styles.accontCreateFromRecom}>createここにアカウント作るを入れる</div>


        </div>
    </div>
}

export default InviteReview;
