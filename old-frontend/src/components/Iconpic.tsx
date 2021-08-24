import styles from '../styles/icon.module.scss'
import icon from '../assets/icon1.png'

const Iconpic = () => {
    return (
        <div className={styles.icon}>
            <img src={icon} alt="icon" />
        </div>
    )
}
export default Iconpic
