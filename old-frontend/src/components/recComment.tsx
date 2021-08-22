import styles from '../styles/recComment.module.scss'
import globalStyles from '../styles/Global.module.scss'

type comType = {
    comment : string
}

//推薦理由
export default function RecComment(props:comType){
    //ひとまず↓
    const　s_comment : string = "フロント"
    console.log(props.comment)

    return ( <div className={styles.comment}>
            <div className={styles.comment_content}>
                <span className={styles.icon}></span> 
                
                <span className={styles.comment_reason}>{props.comment}</span>
                <span className={styles.comment_below}>がすごいひと！</span>
            </div>
        </div>
    )
}

