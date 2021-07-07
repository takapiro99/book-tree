import styles from "../styles/Recommended_Sentence.module.scss"
import icon1 from "../assets/icon1.png"
import fukidashi from "../assets/fukidashi.png"
import greencloud from "../assets/greencloud.png"

const RecommendedSentence = () => {
    return (
        <div className={styles.recommended}>
            <div className={styles.icon}><img src={icon1} alt="TwitterIcon" /></div>
            <div className={styles.greencloud}><img src={greencloud} alt="cloud" /></div>
            <div className={styles.fukidashi}>
                <img src={fukidashi} alt="fukidashi" /> </div>
            <p className={styles.sentence1}>***がすごいあなたに</p>
            <p className={styles.sentence2}>おすすめの本を教えてほしい！</p>
        </div>
    )
}

export default RecommendedSentence;
