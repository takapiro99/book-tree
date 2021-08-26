import styles from '../styles/recComment.module.scss'

interface comType {
    comment: string
}

//推薦理由
export default function RecComment(props: comType) {
    return (
        <div className={styles.comment}>
            <div className={styles.comment_content}>
                <span className={styles.icon}></span>
                <span className={styles.comment_reason}>{props.comment}</span>
                <br />
                <span className={styles.comment_below}>がすごいひと！</span>
            </div>
        </div>
    )
}
