import styles from '../styles/BrandLogo.module.scss'
import Link from 'next/link'
import { FaBook, FaTree, FaUserCog, FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../src/lib/AuthProvider'

const mockIcon = 'https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg'

// TODO: ログイン状態またはローディングを取得し、それに応じて表示を変える

/*  eslint @next/next/no-img-element:0 */

const NavBar = () => {
    const { signOut } = useContext(AuthContext)
    const { currentUser, isNavMenuOpen, setNavMenuOpen } = useContext(AuthContext)
    const handleToggleNavMenu = () => {
        if (currentUser) {
            setNavMenuOpen(!isNavMenuOpen)
        } else {
            if (
                window.confirm(`ログインしてね！
ログイン画面に移動しますか？`)
            ) {
                location.href = '/auth/signin'
            }
        }
    }
    const handleSignOut = () => {
        signOut().then(
            (res) => {
                console.log(res)
                alert('ログアウト成功！ｗ')
            },
            (err) => {
                console.error(err)
                alert('ログアウト失敗！ｗ')
            }
        )
    }
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
                    src={currentUser?.photoURL ? currentUser.photoURL : '/images/foxIcon.png'}
                    id="icon"
                    alt="icon"
                    onClick={handleToggleNavMenu}
                />
                {
                    currentUser ? (
                        <>
                            {isNavMenuOpen && (
                                <div className={styles.navMenu}>
                                    <ul>
                                        <Link href="/" passHref={true}>
                                            <li>
                                                <FaBook />
                                                &emsp;トップページ
                                            </li>
                                        </Link>
                                        <Link href={`/${currentUser.uid}`} passHref={true}>
                                            <li>
                                                <FaTree />
                                                &emsp;マイページ
                                            </li>
                                        </Link>
                                        <li>
                                            <FaUserCog />
                                            &emsp;プロフィール編集
                                        </li>
                                        <li onClick={handleSignOut}>
                                            <FaSignOutAlt />
                                            &emsp;ログアウト
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : null /* empty icon */
                }
            </div>
            <div style={{ height: '80px' }} />
        </nav>
    )
}

export default NavBar
