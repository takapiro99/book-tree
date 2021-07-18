import styles from "../styles/CreateLink.module.scss";

const LinkBlock = () => {
  return(<div className={styles.LinkWrapper}>
      <div className={styles.LinkTitle}><i className="fas fa-link"></i> ***がすごいひとへ</div>
      <div className={styles.LinkCreated}>リンクをコピー 
  </div></div>
  );
};

export default LinkBlock;
