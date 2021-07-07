import styles from "../../styles/ReviewForm.module.scss";
import Books from "../../components/Books";
import AddReview from "../../components/AddReview";
import globalStyles from "../../styles/Global.module.scss";


const Form = () => {
    return <div>
    <div className={styles.yellowgreenbar}></div>

    <div className={globalStyles.wrapper}>
        
    <form className="reviewform">
        <div className={globalStyles.wrapper__title}>
        <img src="BOOKTREEを作る.svg" alt="BOOKTREEを作る" className={globalStyles.logoTitle} />
        </div> 
        <div className={`${styles.reviewformName} ${styles.blockbtwMd}`}>
            <div className={styles.reviewformName__block}>
                <div className={styles.reviewformName__namewrapper}>
                    <div className={styles.reviewformName__name}>Nameさん</div>
                </div>
                <div className={styles.reviewformName__icon}></div>
                
            </div>
        </div>
        <div className={styles.blockbtwMd}>
            <div className={styles.reviewform3keywords}>
            <h2>3つのキーワード</h2>
            <div className={styles.reviewform3keywords__example}>例：北大2年 + カフェが好き + 漫画が好き</div>
            <div className={styles.reviewform3keywords__list}>
            <input className={styles.reviewform3keywords__3box} /> <span className={styles.reviewform__plus}><i className="fas fa-plus"></i> </span>
            <input className={styles.reviewform3keywords__3box} /> <span className={styles.reviewform__plus}><i className="fas fa-plus"></i></span>
            <input className={styles.reviewform3keywords__3box} />
            </div>
            </div>
        </div>
        <div className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}>
            <h2>本を選ぶ</h2>
            <div className={styles.reviewformBookselect__block}>
            <input type="text" className={styles.reviewformBookselect__input} placeholder="本のタイトルを入力する" />
            <div className={styles.reviewformBookselectResult}>
            {/* map */}
            <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" />
            </div>
            </div>
        </div>

        <AddReview />
        <AddReview />
        
        <div className={styles.reviewformSubmit}>
        <button className={styles.submitButton}>決定</button>
        </div>
    </form>
    </div></div>
}

export default Form;
