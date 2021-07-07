import styles from "../styles/Recommended_Sentence.module.scss"
import icon1 from "../assets/icon1.png"
import fukidashi from "../assets/fukidashi.png"
import greencloud from "../assets/greencloud.png"

const Recommended_Sentence = () => {
    return (
        <div>
            <div className={styles.icon1}><img src={icon1} alt="TwitterIcon" /></div>
            <div className={styles.fukidashi}>
                <img src={fukidashi} alt="fukidashi" />
                <p>***がすごいあなたに</p>
                <p>おすすめの本を教えてほしい！</p>
            </div>
            <div className={styles.greencloud}><img src={greencloud} alt="cloud" /></div>
        </div>
    )
}

export default Recommended_Sentence
