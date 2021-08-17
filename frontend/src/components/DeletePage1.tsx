import styles from "../styles/DeletePage1.module.scss"
import deleteBOOKTREE from "../assets/deleteBOOKTREE1.svg"

const DeletePage1 = () => {

    return(

        <div className={styles.DeletePage1}>
            <img className={styles.deleteBOOKTREE}src={deleteBOOKTREE} alt="BookTreeを削除します" />
            <p>アカウント情報とレビュー内容を削除します。</p>
            <p>参加してくれてありがとう！</p>
            <p className={styles.button}>削除</p>
        </div>

    );
};

export default DeletePage1;
    