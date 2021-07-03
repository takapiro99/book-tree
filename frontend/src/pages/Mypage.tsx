import { useParams } from "react-router-dom";
import BigTreeWithBooks from "../components/BigTreeWithBooks";


interface RouteParams {
  id: string;
}

const Mypage = () => {
  const { id } = useParams<RouteParams>();

  return (
    <div>
      <p>マイページだよ！</p>
      
      <h3>マイページ</h3>
      <p>
        こんにちは、<span>@{id}</span> さん
      </p>
      <div>通知的なやつ</div>
      <BigTreeWithBooks />
      <p>Nekoさん</p>
      {/* ここにメニュー */}
    </div>
  );
};

export default Mypage;
