import booktree_logo from "../assets/BOOKTREE_logo.png";
import tukuttemiru from "../assets/tukuttemiru.png";
import tukuttemiru_yellow from "../assets/tukuttemiru_yellow.png";


import styles from "../styles/BrandLogo.module.scss";


const BrandLogo = () => {
  return(

  <div className={styles.BrandLogo}>
    <img className={styles.booktree_logo} src={booktree_logo} alt="booktreelogo" />
    <div className={styles.BrandLogo_sentence}>
      <p>つないですごい人たちの本で木を育てよう</p>
      <p>期間限定完全紹介制プロジェクト</p>
    </div>
    <div className={styles.yellowbox}>
      <img className={styles.tukuttemiru} src={tukuttemiru} alt="BOOKTREEを作ってみる" />
      <img className={styles.tukuttemiru_yellow} src={tukuttemiru_yellow} alt="BOOKTREEを作ってみる" />

    </div>
  </div>
  
  );
};

export default BrandLogo;
  