import booktree_logo from '../assets/BrandLogo.png'
import icon from '../assets/takapiro.png'
import styles from '../styles/BrandLogo.module.scss'

// ナビゲーションバー並みの規模(でかい)になっているので、navbar.tsxに移植しました
// 使ってない className は消した
// クラス名でスタイル当てたほうが良さそう、コードが読みやすいので

const BrandLogo = () => {
    return (
        <div className={styles.BrandLogo}>
            <img
                className={styles.booktree_logo}
                src={booktree_logo}
                alt="booktreelogo"
            />
            <img className={styles.icon} src={icon} id="icon" alt="icon" />
            <div className={styles.menu}>
                <ul>
                    <li>
                        　<i className="fas fa-book"></i>　トップページ
                    </li>
                    <li>
                        　<i className="fas fa-tree"></i>　マイページ
                    </li>
                    <li>
                        　<i className="fas fa-user-cog"></i>　プロフィール編集
                    </li>
                    <li>
                        　<i className="fas fa-sign-out-alt"></i>　ログアウト
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BrandLogo
