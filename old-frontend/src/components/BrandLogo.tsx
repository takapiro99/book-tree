import booktree_logo from '../assets/BrandLogo.png'
import icon from '../assets/icon1.png'
import styles from '../styles/BrandLogo.module.scss'

const BrandLogo = () => {
    return (
        <div className={styles.BrandLogo}>
            <img
                className={styles.booktree_logo}
                src={booktree_logo}
                alt="booktreelogo"
            />
            <img className={styles.icon} src={icon} id="icon" alt="icon" />
            <div id="menu">
                <ul>
                    <li>トップページ</li>
                    <li>マイページ</li>
                    <li>設定</li>
                    <li>ログアウト</li>
                </ul>
            </div>

        </div>
    )
}

export default BrandLogo
