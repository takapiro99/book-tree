import LittleTree from "../components/LittleTree";
import styles from "../styles/top.module.scss";

const Top = () => {
  return(
    <div>ここがTOP画面 
      <div className={styles.forestWrapper}>
      <div className={styles.littletreeWrapper}>
        <LittleTree />
        <LittleTree />
        <LittleTree />
      </div>
      <div className={styles.littletreeWrapper2}>
        <LittleTree />
        <LittleTree />
        <LittleTree />
      </div>
      </div>
    
  </div>);
};
export default Top;
