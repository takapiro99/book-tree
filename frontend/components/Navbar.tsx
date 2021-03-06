import styles from '../styles/BrandLogo.module.scss'
import Link from 'next/link'
import { FaBook, FaTree, FaUserCog, FaSignOutAlt, FaSignInAlt, FaRegSun } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../lib/AuthProvider'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useRouter } from 'next/dist/client/router'
import { errorToast, successToast } from '../lib/toasts'

// TODO: ログイン状態またはローディングを取得し、それに応じて表示を変える

/*  eslint @next/next/no-img-element:0 */

const NavBar = () => {
    const { signOut } = useContext(AuthContext)
    const router = useRouter()
    const { currentUser, userInfo } = useContext(AuthContext)
    const handleSignOut = () => {
        signOut().then(
            (res) => {
                console.log(res)
                successToast('ログアウトしました')
            },
            (err) => {
                console.error(err)
                errorToast('ログアウトに失敗しました')
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
                                src={userInfo?.profileImage as string}
                                id="icon"
                                alt="icon"
                            />
                        }
                        transition
                        offsetY={10}
                    >
                        <MenuItem
                            onClick={() => router.push('/')}
                            styles={{
                                hover: {
                                    backgroundColor: 'rgb(218, 241, 181)'
                                }
                            }}
                        >
                            <FaBook /> &emsp;トップページ
                        </MenuItem>
                        <MenuItem
                            disabled={!currentUser}
                            styles={{
                                hover: {
                                    backgroundColor: 'rgb(218, 241, 181)'
                                }
                            }}
                            onClick={() => router.push(currentUser ? `/${currentUser.uid}` : '')}
                        >
                            <FaTree /> &emsp;マイページ
                        </MenuItem>
                        <MenuItem
                            onClick={() => router.push(currentUser ? `/config` : '')}
                            styles={{
                                hover: {
                                    backgroundColor: 'rgb(218, 241, 181)'
                                }
                            }}
                        >
                            <FaRegSun /> &emsp;設定
                        </MenuItem>
                        <MenuItem
                            disabled={!currentUser}
                            onClick={handleSignOut}
                            styles={{
                                hover: {
                                    backgroundColor: 'rgb(218, 241, 181)'
                                }
                            }}
                        >
                            <FaSignOutAlt /> &emsp;ログアウト
                        </MenuItem>
                    </Menu>
                ) : (
                    <Menu
                        menuButton={
                            <img
                                className={styles.icon}
                                src={'/images/profile_icon.png'}
                                id="icon"
                                alt="icon"
                            />
                        }
                        transition
                        offsetY={10}
                    >
                        <MenuItem
                            onClick={() => router.push('/auth/signin')}
                            styles={{
                                hover: {
                                    backgroundColor: 'rgb(218, 241, 181)'
                                }
                            }}
                        >
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
