import styles from '../styles/BrandLogo.module.scss'
import Link from 'next/link'
import { FaBook, FaTree, FaUserCog, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useRouter } from 'next/dist/client/router'

// TODO: ログイン状態またはローディングを取得し、それに応じて表示を変える

/*  eslint @next/next/no-img-element:0 */

const NavBar = () => {
    const { signOut } = useContext(AuthContext)
    const router = useRouter()
    const { currentUser } = useContext(AuthContext)

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
                <Link href="/">
                    <div className={styles.booktree_logo_wrapper}>
                        <img
                            className={styles.booktree_logo}
                            src="/images/BrandLogo.png"
                            alt="booktreelogo"
                        />
                    </div>
                </Link>
                {currentUser ? (
                    <Menu
                        menuButton={
                            <img
                                className={styles.icon}
                                src={currentUser.photoURL as string}
                                id="icon"
                                alt="icon"
                            />
                        }
                        transition
                        offsetY={10}
                    >
                        <MenuItem onClick={() => router.push('/')}>
                            <FaBook /> &emsp;トップページ
                        </MenuItem>
                        <MenuItem
                            disabled={!currentUser}
                            onClick={() => router.push(currentUser ? `/${currentUser.uid}` : '')}
                        >
                            <FaTree /> &emsp;マイページ
                        </MenuItem>
                        <MenuItem disabled={!currentUser} onClick={handleSignOut}>
                            <FaSignOutAlt /> &emsp;ログアウト
                        </MenuItem>
                    </Menu>
                ) : (
                    <Menu
                        menuButton={
                            <img
                                className={styles.icon}
                                src={'/images/foxIcon.png'}
                                id="icon"
                                alt="icon"
                            />
                        }
                        transition
                        offsetY={10}
                    >
                        <MenuItem onClick={() => router.push('/auth/signin')}>
                            <FaSignInAlt /> &emsp;ログインする
                        </MenuItem>
                    </Menu>
                )}
            </div>
            <div style={{ height: '80px' }} />
        </nav>
    )
}

export default NavBar
