import styles from "../../styles/ReviewForm.module.scss";
import Books from "../../components/Books";
import AddReview from "../../components/AddReview";
import globalStyles from "../../styles/Global.module.scss";
import { useState } from 'react';
import { BooksProps } from '../../components/Books';
import axios from 'axios'

    // インターフェース
interface IData {
        threeWords: string[]
        book:BooksProps
        selectedBooks:([])
      }
      // 初期データ
const initialData: IData = {
        threeWords: [],
        book:{
        bookImageURL:"",
        displayType:"bookOnly",
        bookLink:"",
        userID:"",
        },
        selectedBooks:([]),
      }

const Form = () => {

    //保存するデータ
    const [data, setData] = useState<IData>(initialData);
    //保存しないデータ
    const [title,setTitle] = useState('')
    
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;
        setData({ ...data, [name]: value });
        console.log(data)
    }
    const searchBooks = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTitle(value)
        console.log(title)
        //ここでAPIを用いて本の情報を取得する
        axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          // alert('err occurred')
          console.error(error)
        })
    }

    return <div>
    <div className={styles.yellowgreenbar}></div>

    <div className={globalStyles.wrapper}>
        
    <form className="reviewform">
        <div className={globalStyles.wrapper__title}>
        <img src="BOOKTREEを作る.svg" alt="BOOKTREEを作る" className={globalStyles.logoTitle} />
        </div> 
        <div className={`${styles.reviewformName} ${styles.blockbtwMd}`}>
            <div className={styles.reviewformName__block}>
                <div className={styles.reviewformName__namewrapper}>
                    <div className={styles.reviewformName__name}>Nameさん</div>
                </div>
                <div className={styles.reviewformName__icon}></div>
                
            </div>
        </div>
        <div className={styles.blockbtwMd}>
            <div className={styles.reviewform3keywords}>
            <h2>3つのキーワード</h2>
            <div className={styles.reviewform3keywords__example}>例：北大2年 + カフェが好き + 漫画が好き</div>
            <div className={styles.reviewform3keywords__list}>
            <input className={styles.reviewform3keywords__3box} name="threeWords" value={data.threeWords} onChange={handleChangeInput}/> <span className={styles.reviewform__plus}><i className="fas fa-plus"></i> </span>
            <input className={styles.reviewform3keywords__3box} name="threeWords" value={data.threeWords} onChange={handleChangeInput}/> <span className={styles.reviewform__plus}><i className="fas fa-plus"></i></span>
            <input className={styles.reviewform3keywords__3box} name="threeWords" value={data.threeWords} onChange={handleChangeInput}/>
            </div>
            </div>
        </div>
        <div className={`${styles.reviewformBookselect} ${styles.blockbtwMd}`}>
            <h2>本を選ぶ</h2>
            <div className={styles.reviewformBookselect__block}>
            <input type="text" className={styles.reviewformBookselect__input} placeholder="本のタイトルを入力する" name="searchBookTitle" value={title} onChange={searchBooks}/>
            <div className={styles.reviewformBookselectResult}>
            {/* map */}
            <Books bookImageURL="" bookLink="" displayType="bookOnly" userID="sakusaku" />
            </div>
            </div>
        </div>
        {
            data.selectedBooks.length && data.selectedBooks.map((book) =>{
                return(
                    <AddReview                             
                    bookImageURL={data.book.bookImageURL}
                    bookLink={data.book.bookLink}
                    displayType={data.book.displayType}
                    userID={data.book.userID}
                    key={data.book.userID}
                />
                )
            })
        }
        <div className={styles.reviewformSubmit}>
        <button className={styles.submitButton}>決定</button>
        </div>
    </form>
    </div></div>
}

export default Form;
