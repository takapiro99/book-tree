import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ border: "1px grey solid" }}>
      仮のfooterです
      <Link to="/">top</Link>
      <span>&nbsp;</span>
      <Link to="/signin">signin</Link>
      <span>&nbsp;</span>
      <Link to="/@myID">mypage</Link>
      <span>&nbsp;</span>
      <Link to="/404">not found</Link>
      <span>&nbsp;</span>
      <Link to="/review/@hoge">review</Link>
      <span>&nbsp;</span>
      <Link to="/review/new">review編集/new</Link>
    </div>
  );
};

export default Footer;
