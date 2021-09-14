import styles from '../../styles/Delete.module.scss'
export default function Complete() {
    return (
        <div>
            <div>
                <p className={styles.deleted_sentence}>
                    完全に削除することに成功しました。 もし気が向いたらまた来てね。
                </p>
            </div>
        </div>
    )
}
