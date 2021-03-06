import { FaGithub, FaQuestion } from 'react-icons/fa'
import styles from '../styles/footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer_wrapper}>
            <div className={styles.icon_wrapper}>
                <a href="https://github.com/takapiro99/book-tree" target="blank" rel="noreferrer">
                    <div className={styles.icon1}>
                        <FaGithub size={25} color="#eee" />
                    </div>
                </a>
                <a href="https://forms.gle/3rEduWMNYPspcF8j8" target="blank" rel="noreferrer">
                    <div className={styles.icon2}>
                        <FaQuestion size={24} color="#eee" />
                    </div>
                </a>
            </div>
            <p className={styles.sentence}>
                2021 スイカバー{' '}
                <a style={{ fontSize: '0.2rem' }} href="https://webservice.rakuten.co.jp/">
                    Supported by Rakuten Developers
                </a>
            </p>
        </div>
    )
}

export default Footer
