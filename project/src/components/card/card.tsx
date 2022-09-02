import { Offer } from '../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../store';
import { addFavorites, fetchPropertyAction, } from '../../store/api-action';
import { updateNearByOffer } from '../../store/action';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type PropsForCard = {
  offer: Offer;
  onListItemHover?: (listItemName: Offer | undefined) => void;
  updateNearBy?: boolean,
};

function Card(props: PropsForCard): JSX.Element {

  const { onListItemHover, offer, updateNearBy } = props;
  const { id, isPremium, previewImage, price, title, type, rating, isFavorite } = offer;

  const isAuth = useAppSelector((state) => state.authorizationStatus);

  const navigate = useNavigate();

  function changeHover(state: boolean) {
    if (onListItemHover) {
      if (state) {
        onListItemHover(offer);
      }
      else {
        onListItemHover(undefined);
      }
    }
  }

  function handleClick() {
    if (isAuth === AuthorizationStatus.Auth) {
      //если isFavorite = true, то нам нужно удалить из избранного, а значит послать статус "0" и наоборот
      const status = isFavorite ? 0 : 1;
      store.dispatch(addFavorites({ id, status }));
      if (updateNearBy) {
        store.dispatch(updateNearByOffer(offer));
      }
    }
    else {
      navigate('/login');
    }
  }

  return (

    <article className={`${updateNearBy ? 'near-places__card place-card' : 'cities__card place-card'}`} onMouseEnter={(evt) => { changeHover(true); }} onMouseLeave={() => changeHover(false)}>

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} onClick={() => { store.dispatch(fetchPropertyAction(id)); }}>
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
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''} `} type="button" onClick={() => { handleClick(); }}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: 15 * Math.round(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} onClick={(evt) => { store.dispatch(fetchPropertyAction(id)); }}>{title}</Link>
        </h2>
        <p className="place-card__type"> {type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article >


  );
}

export default Card;
