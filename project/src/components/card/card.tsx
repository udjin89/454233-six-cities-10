import { Offer } from '../../types/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type PropsForCard = { offer: Offer };

function Card(props: PropsForCard): JSX.Element {
  const { id, isPremium, previewImage, price, title, type, rating } = props.offer;
  //Добавим хук состояния, в нем храним id карточки на которую навели курсор
  // eslint-disable-next-line
  const [isHover, setHover] = useState(0);
  return (

    <article className="cities__card place-card" onMouseEnter={(evt) => { setHover(id); }} onMouseLeave={() => setHover(0)}>

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place "
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: 15 * rating }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >


  );
}

export default Card;
