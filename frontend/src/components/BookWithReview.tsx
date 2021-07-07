import styels from "../styles/Review.module.scss";
import Books from "./Books";

const BookWithReview = () => {
  return (
    <div className={styels.reviewpageReviewBlock}>
    <div className={styels.reviewpageReviewBook}>
    <Books bookImageURL="" bookLink="" displayType="bookMark" userID="sakusaku" />
    </div>
    <div className={styels.reviewpageReviewContent}>
    <div className={styels.reviewpageReviewContent__reason}>初学者におすすめ</div>
    <div className={styels.reviewpageReviewContent__comment}>ここがすごいと思います！</div>
    </div>
</div>
  );
};
export default BookWithReview;
