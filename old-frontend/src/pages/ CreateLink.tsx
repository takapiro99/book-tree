import globalStyles from '../styles/Global.module.scss'
import styles from '../styles/CreateLink.module.scss'
import BOOKTREE from '../assets/BOOKTREE.png'
//import LinkBlock from '../components/LinkBlock'
import { useState } from 'react'

// interface LinkInfo {
//     Why:String[]
//     URL:String[]
// }

const CreateLink = () => {
    const [reason, SetReason] = useState(String())
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
        <div className={globalStyles.wrapper}>
            <div className={styles.createLinkWrapper}>
                <h1 className={styles.createLinkTitle}>お願いリンクを作る</h1>
                <div className={styles.createLinkBlock}>
                    <img
                        src={BOOKTREE}
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
                        <button
                            className={styles.createButtonBlock__button}
                            onClick={makeLink}
                        >
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
        </div>
    )
}

export default CreateLink
