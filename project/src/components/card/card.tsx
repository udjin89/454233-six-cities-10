import { Offer } from '../../types/types';
// import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { fetchPropertyAction } from '../../store/api-action';

type PropsForCard = {
  offer: Offer;
  onListItemHover: (listItemName: any) => void;
};

function Card(props: PropsForCard): JSX.Element {

  const { onListItemHover, offer } = props;
  const { id, isPremium, previewImage, price, title, type, rating } = offer;


  function changeHover(state: boolean) {

    if (state) {

      onListItemHover(offer);
    }
    else {
      props.onListItemHover(undefined);
    }
  }


  return (

    <article className="cities__card place-card" onMouseEnter={(evt) => { changeHover(true); }} onMouseLeave={() => changeHover(false)}>

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`} onClick={() => { store.dispatch(fetchPropertyAction(id)); }}>
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
          <Link to={`offer/${id}`} onClick={() => { store.dispatch(fetchPropertyAction(id)); }}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >


  );
}

export default Card;
