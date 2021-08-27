import styles from '../styles/LittleTree.module.scss'

/* eslint @next/next/no-img-element:0 */

const LittleTree = () => {
    // 文字カウントする関数
    const content = 'フロントエンド'
    return (
        <div>
            <div className={styles.littletree_pic}>
                <img src="/images/LittleTree_flag.png" alt="littletree" />
                <p className={styles.flag_sentence_1}>{content}</p>
                <p className={styles.flag_sentence_2}>がすごい人！</p>
                <div className={styles.icon_pic}>
                    <img src="/images/foxIcon.png" alt="TwitterIcon" />
                </div>
                <div>{/* <img className={styles.shiori}src={shiori} alt="shiori" /> */}</div>
                <p className={styles.name}>＊＊＊さん</p>
            </div>
            {/* <div className={styles.icon_pic}><img  src={icon} alt="TwitterIcon" /></div> */}
        </div>
    )
}

export default LittleTree

// 囲っているのが親要素 imgだめ
