import styles from "../styles/CreateLink.module.scss";

const LinkBlock = (ToWho:String,Link:String) => {
  return(<div className={styles.LinkWrapper}>
      <div className={styles.LinkTitle}><i className="fas fa-link"></i> {ToWho}がすごいひとへ</div>
      <div className={styles.LinkCreated}>リンクをコピー {Link}
  </div></div>
  );
};

export default LinkBlock;
