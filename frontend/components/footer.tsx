import { FaGithub, FaQuestion } from 'react-icons/fa'
import styles from '../styles/footer.module.scss'
import { IconContext } from 'react-icons'

const Footer = () => {
    return (
        <div className={styles.footer_wrapper}>
            <div className={styles.icon_wrapper}>
                <div className={styles.icon1}>
                    <FaGithub size={25} />
                </div>
                <div className={styles.icon2}>
                    <FaQuestion size={24} />
                </div>
            </div>
            <p className={styles.sentence}>2021 スイカバー</p>
        </div>
    )
}

export default Footer
