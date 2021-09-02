import styles from '../styles/invite.module.scss'
//import LinkBlock from '../components/LinkBlock'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import Head from 'next/head'

// interface LinkInfo {
//     Why:String[]
//     URL:String[]
// }

/* eslint @next/next/no-img-element:0 */

// TODO: check if signed in

const Invite = () => {
    const [reason, SetReason] = useState('')
    //const [addLink,SetAddLink] = useState<LinkInfo>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        SetReason(value)
        console.log(value)
    }

    const makeLink = () => {
        // SetAddLink(reason)
        //ここで入力された”理由”を元にURL作成
        //作成されたURLをaddLinkに追加
        SetReason('')
    }

    return (
        <div>
            <Head>
                <title>CreateLink</title>
            </Head>
            {/* // className={globalStyles.wrapper} */}
            <div className={styles.createLinkWrapper}>
                <h1 className={styles.createLinkTitle}>お願いリンクを作る</h1>
                <div className={styles.createLinkBlock}>
                    <img
                        src="/images/mediumBookTree.png"
                        alt="ブックツリー"
                        className={styles.createLinkBlock__tree}
                    />
                    <div className={styles.createLinkBlock__input}>
                        <input
                            className={styles.createLinkBlock__reason}
                            placeholder="なにがすごい？"
                            value={reason}
                            onChange={handleChange}
                        />
                        <span>がすごいひとにお願いする</span>
                    </div>
                    <div className={styles.createButtonBlock}>
                        <button className={styles.createButtonBlock__button} onClick={makeLink}>
                            作成
                        </button>
                    </div>
                </div>
                {reason}
                {/* { addLink?.map((link) => {
            return(<LinkBlock Why={addLink}/>
            )}

        )} */}
            </div>
            <div className={styles.linkcopy}>
                <input
                    className={styles.url}
                    type="text"
                    name="link "
                    placeholder="作成されたURLが表示されます"
                    // value={link} ここわかりません
                ></input>
                <p className={styles.link}>URL</p>
                <div className={styles.copyicon}>
                    <FaCopy />
                </div>
            </div>
        </div>
    )
}

export default Invite
