import { Comment } from '../../types/types';
import { MONTH } from '../../const';

type PropsReviewsItem = { review: Comment };

function ReviewsItem(props: PropsReviewsItem): JSX.Element {

  const { comment, date, rating, user, } = props.review;
  const { avatarUrl, name } = user;

  const formatDate = new Date(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: 20 * rating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">{MONTH[formatDate.getMonth()]} {formatDate.getFullYear()} </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
