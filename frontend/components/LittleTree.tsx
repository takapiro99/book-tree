import styles from '../styles/LittleTree.module.scss'

import Link from 'next/link'
import { ReviewJoinedUser } from '../lib/types'
import React from 'react'
/* eslint @next/next/no-img-element:0 */

interface LittleTreeProps {
    review: ReviewJoinedUser
}

const LittleTree: React.FC<LittleTreeProps> = ({ review }) => {
    // 文字カウントする関数
    const content = review.specialty
    return (
        <div>
            <div className={styles.littletree_pic}>
                <img src="/images/LittleTreeSmall.png" alt="littletree" />
                <p className={styles.flag_sentence_1}>{content}</p>
                <p className={styles.flag_sentence_2}>がすごい人！</p>
                <Link href={`/${review.uid}`}>
                    <div className={styles.icon_pic}>
                        <img src={review.user.profileImage} alt="TwitterIcon" />
                    </div>
                </Link>
                <div>{/* <img className={styles.shiori}src={shiori} alt="shiori" /> */}</div>
                <p className={styles.name}>{review.user.displayName}さん</p>
            </div>
            {/* <div className={styles.icon_pic}><img  src={icon} alt="TwitterIcon" /></div> */}
        </div>
    )
}

export default LittleTree

// 囲っているのが親要素 imgだめ
