import { useParams } from "react-router-dom";
import BigTreeWithBooks from "../components/BigTreeWithBooks";
import styles from "../styles/Mypage.module.scss";
import globalStyles from "../styles/Global.module.scss";

interface RouteParams {
  id: string;
}

const Mypage = () => {
  const { id } = useParams<RouteParams>();

  return (
    <div className={globalStyles.wrapper}>
        こんにちは、<span>@{id}</span> さん
      <div className="wrapper mypage-wrapper"> 
      <div className="mypage wrapper-content">
    <div className="wrapper__title">
        <img src="BOOKTREEを作る.svg" alt="BOOKTREEを作る" className="logo-title" />
    </div> 

    <div className={styles.mypageNews}>
        <div className={styles.mypageNews__news}><i className="fas fa-bullhorn"></i>　<a href="#review">お願いしていたレビューが届いたよ！</a></div>
    </div>
    <BigTreeWithBooks />
    </div>

    <div className={styles.mypageButtons}>
        <button className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}>レビューを作成する</button>
        <button className={`${styles.mypageButtons__button} ${styles.buttonWhite}`}>レビューをお願いする</button>
        <button className={`${styles.mypageButtons__button} ${styles.buttonGray}`}>BOOK TREEを削除する</button>
    </div>
    </div>

    </div>
    
  );
};

export default Mypage;
