import booktree_logo from "../assets/BrandLogo.png";
import tukuttemiru from "../assets/tukuttemiru.png";
import tukuttemiru_yellow from "../assets/tukuttemiru_yellow.png";


import styles from "../styles/BrandLogo.module.scss";

import styles from '../styles/BrandLogo.module.scss'

const BrandLogo = () => {
  return(

  <div className={styles.BrandLogo}>
    <img className={styles.booktree_logo} src={booktree_logo} alt="booktreelogo" />

    <ul>
    <li>トップページ</li>
    <li>マイページ</li>

    </ul>

    {/* <div className={styles.BrandLogo_sentence}>
        <p>top</p>
        <p>mypage</p>
    </div> */}
   
  </div>

  );
};

export default BrandLogo
