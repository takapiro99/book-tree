import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/CreateLink.module.scss'


const CreateLink = () => {
    return <div className={globalStyles.wrapper}>
        <h1 className={styles.createLinkTitle}>お願いリンクを作る</h1>
        <div className={styles.createLinkBlock}>
            <input placeholder="どんなとこがすごい？" /><span>がすごいひとにお願いする</span><button>作成</button>
        </div>
        <div className={styles.LinkCreated}><span className={styles.LinkCreated__share}><i className="fas fa-external-link-alt"></i></span></div>
    </div>
}

export default CreateLink;
