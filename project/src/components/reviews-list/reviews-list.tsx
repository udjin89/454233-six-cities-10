import { Fragment } from 'react';
import { Reviews } from '../../types/types';
import ReviewsItem from '../reviews-item/reviews-item';

type PropsReview = { reviews: Reviews };

function ReviewsList(props: PropsReview): JSX.Element {

  const countReviews = props.reviews.length;
  const reviewsList = props.reviews;
  // console.log(props.reviews)

  const reviewsListSort = reviewsList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

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
