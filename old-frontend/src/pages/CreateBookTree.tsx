import styles from '../styles/CreateBookTree.module.scss'
import title from '../assets/createBookTree.svg'

const CreateBookTree = () => {
    return (
        <div>
            <img className={styles.title} src={title} alt="aaa" />
            <p className={styles.Twitter}>Twitterアカウントで作る</p>
            <p className={styles.Google}>Googleアカウントで作る</p>
        </div>
    )
}

export default CreateBookTree
