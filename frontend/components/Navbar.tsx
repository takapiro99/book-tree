import Image from 'next/image'
import styles from '../styles/BrandLogo.module.scss'
import booktree_logo from '/public/images/BrandLogo.png'
import { FaBook, FaTree, FaUserCog, FaSignOutAlt } from 'react-icons/fa'

const mockIcon = 'https://pbs.twimg.com/profile_images/1268541932541804544/pTEgObfP_400x400.jpg'

// TODO: ログイン状態またはローディングを取得し、それに応じて表示を変える

/*  eslint @next/next/no-img-element:0 */

const NavBar = () => {
    return (
        <>
            <div className={styles.navbar_wrapper}>
                <div className={styles.booktree_logo_wrapper}>
                    {/* <Image objectFit="contain" src={booktree_logo} alt="booktreelogo" /> */}
                    <img
                        className={styles.booktree_logo}
                        src="/images/BrandLogo.png"
                        alt="booktreelogo"
                    />
                </div>
                {/* <Image
                className={styles.icon}
                src={mockIcon}
                id="icon"
                alt="icon"
                objectFit="contain"
                height={50}
                width={50}
            /> */}
                {/* <div>
                <ul className={styles.navMenu}>
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
            </div> */}
            </div>
            <div style={{ height: '80px' }} />
        </>
    )
}

export default NavBar
