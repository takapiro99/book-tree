import booktree_logo from "../assets/BrandLogo.png";


import styles from "../styles/BrandLogo.module.scss";

const BrandLogo = () => {
  return(

  <div className={styles.BrandLogo}>
    <img className={styles.booktree_logo} src={booktree_logo} alt="booktreelogo" />

    <ul>
    <li>トップページ</li>
    <li>マイページ</li>

    </ul>

  </div>

  );
};

export default BrandLogo
