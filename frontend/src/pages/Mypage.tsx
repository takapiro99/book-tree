import BigTreeWithBooks from "../components/BigTreeWithBooks";
import BrandLogo from "../components/BrandLogo";

const Mypage = () => {
  return (
    <div>
      <p>マイページだよ！</p>
      <BrandLogo />
      <h3>マイページ</h3>
      <div>通知的なやつ</div>
      <BigTreeWithBooks />
      <p>Nekoさん</p>
      {/* ここにメニュー */}
    </div>
  );
};

export default Mypage;
