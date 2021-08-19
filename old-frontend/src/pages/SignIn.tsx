import styles from "../styles/Signin.module.scss";



const SignIn = () => {
  return <div>
        <p className={styles.title}>BOOKTREEにログインする</p>
        <p className={styles.Twitter}>Twitterアカウントでログイン</p>
        <p className={styles.Google}>Googleアカウントでログイン</p>
  
  </div>;
};

export default SignIn
