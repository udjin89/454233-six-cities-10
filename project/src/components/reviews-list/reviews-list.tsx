import { Fragment } from 'react';
import { Comments } from '../../types/types';
import { MAX_COMMENT } from '../../const';
import ReviewsItem from '../reviews-item/reviews-item';

type PropsReview = { reviews: Comments };

function ReviewsList(props: PropsReview): JSX.Element {

  const countReviews = props.reviews.length;
  const reviewsList = props.reviews;

  let reviewsListSort = [...reviewsList].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  reviewsListSort = reviewsListSort.slice(0, MAX_COMMENT);

  return (
    <Fragment>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{countReviews}</span>
      </h2>
      <ul className="reviews__list">
        {
          reviewsListSort.map((item, idx) => {
            const keyValue = `${idx}-${item.id}`;
            return (<ReviewsItem key={keyValue} review={item} ></ReviewsItem>);

          })
        }

      </ul>
    </Fragment>
  );
}


export default ReviewsList;
