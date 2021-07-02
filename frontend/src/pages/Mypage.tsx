import BigTreeWithBooks from "../components/BigTreeWithBooks";
import BrandLogo from "../components/BrandLogo";
import LittleTree from "../components/LittleTree";
import Reviewtree from "../components/review_tree";

const Mypage = () => {
  return (
    <div>
      <p>マイページだよ！</p>
      <BrandLogo />
      <LittleTree />
      <Reviewtree />
      <h3>マイページ</h3>
      <div>通知的なやつ</div>
      <BigTreeWithBooks />
      <p>Nekoさん</p>
      {/* ここにメニュー */}
    </div>
  );
};

export default Mypage;
