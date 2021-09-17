import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div style={{ border: '1px grey solid' }}>
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
            <span>&nbsp;</span>
            <Link to="/delete">BOOK TREE削除</Link>
            <span>&nbsp;</span>
            <Link to="/invitation">依頼された時</Link>
            <span>&nbsp;</span>
            <Link to="/createLink">リンクを作る</Link>
            <span>&nbsp;</span>
            <Link to="/createBookTree">BOOK TREEをつくる</Link>
            <span>&nbsp;</span>
            <Link to="/setting">設定</Link>
            <span>&nbsp;</span>
        </div>
    )
}

export default Footer
