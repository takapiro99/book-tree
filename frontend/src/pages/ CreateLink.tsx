import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/CreateLink.module.scss'
import BOOKTREE from "../assets/BOOKTREE.png"
import LinkBlock from '../components/LinkBlock'

const CreateLink = () => {
    return <div className={globalStyles.wrapper}>
        <div className={styles.createLinkWrapper}>
        <h1 className={styles.createLinkTitle}>お願いリンクを作る</h1>
        <div className={styles.createLinkBlock}>
            <img src={BOOKTREE} alt='ブックツリー' className={styles.createLinkBlock__tree}/>
            <div className={styles.createLinkBlock__input}><input className={styles.createLinkBlock__reason} placeholder="なにがすごい？" /><span>がすごいひとにお願いする</span></div>
            <div className={styles.createButtonBlock}><button className={styles.createButtonBlock__button}>作成</button></div>
        </div>
        <LinkBlock />
        <LinkBlock />
        </div>
    </div>
}

export default CreateLink;
