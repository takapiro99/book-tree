import styles from '../styles/BrandLogo.module.scss'
import Link from 'next/link'
import { FaBook, FaTree, FaUserCog, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../src/lib/AuthProvider'

const mockIcon = 'https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg'

// TODO: ログイン状態またはローディングを取得し、それに応じて表示を変える

/*  eslint @next/next/no-img-element:0 */

const NavBar = () => {
    const { isNavMenuOpen, setNavMenuOpen } = useContext(AuthContext)
    return (
        <nav>
            <div className={styles.navbar_wrapper}>
                <Link href="/" passHref={true}>
                    <div className={styles.booktree_logo_wrapper}>
                        <img
                            className={styles.booktree_logo}
                            src="/images/BrandLogo.png"
                            alt="booktreelogo"
                        />
                    </div>
                </Link>
                <img
                    className={styles.icon}
                    src={mockIcon}
                    id="icon"
                    alt="icon"
                    onClick={() => setNavMenuOpen(!isNavMenuOpen)}
                />
                {isNavMenuOpen && (
                    <div className={styles.navMenu}>
                        <ul>
                            <li>
                                <FaBook />
                                &emsp;トップページ
                            </li>
                            <li>
                                <FaTree />
                                &emsp;マイページ
                            </li>
                            <li>
                                <FaUserCog />
                                &emsp;プロフィール編集
                            </li>
                            <li>
                                <FaSignOutAlt />
                                &emsp;ログアウト
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div style={{ height: '80px' }} />
        </nav>
    )
}

export default NavBar
