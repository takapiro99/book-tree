import Image from 'next/image'
import icon from '../assets/icon1.png'
import styles from '../styles/LittleTree.module.scss'

const LittleTree = () => {
    // 文字カウントする関数
    const content = 'フロントエンド'
    return (
        <div>
            <div className={styles.flag_sentence}>
                <Image
                    className={styles.littletree_pic}
                    src="/images/LittleTree_flag.png"
                    layout="fill"
                    objectFit="contain"
                    alt="littetree"
                />
                <p className={styles.flag_sentence_1}>{content}</p>
                <p className={styles.flag_sentence_2}>がすごい人！</p>
                <div className={styles.icon_pic}>
                    {/* <img src={icon} alt="TwitterIcon" /> */}
                </div>
            </div>
            {/* <div className={styles.icon_pic}><img  src={icon} alt="TwitterIcon" /></div> */}
        </div>
    )
}

export default LittleTree

// 囲っているのが親要素 imgだめ
