import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/InviteReview.module.scss'
import Iconpic from '../components/Iconpic'
import greencloud from '../assets/greencloud.png'
import reviewImg from '../assets/reviewImg.png'
import title from '../assets/createBookTree.svg'

const InviteReview = () => {
    return (
        <div className={globalStyles.wrapper}>
            <div className={styles.nominateBlock}>
                <div className={styles.nominateReasonWrapper}>
                    <h1 className={styles.nominateBlock__reason}>
                        デザインがすごいあなたに
                        <br />
                        おすすめの本を教えて
                        <br />
                        ほしーーーーーい！！
                    </h1>
                </div>

                <div className={styles.nominateFromWho}>
                    <Iconpic />

                    <img
                        src={greencloud}
                        alt="cloud"
                        className={styles.greenCloud}
                    />
                </div>

                <div className={styles.nominateExplation}>
                    レビューを書いてくれると＊＊＊さんのBOOKTREEにあなたのレビューが実ります。
                </div>

                <div className={styles.reviewSteps}>
                    <img src={reviewImg} alt="レビューを書くと相手の木に実る" />
                </div>
                <div className={styles.accontCreateFromRecom}>
                    <div>
                        <img className={styles.title} src={title} alt="aaa" />
                        <p className={styles.Twitter}>
                            Twitterアカウントで作る
                        </p>
                        <p className={styles.Google}>Googleアカウントで作る</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InviteReview
