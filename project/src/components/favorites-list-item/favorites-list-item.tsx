
import { Offer } from '../../types/types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { store } from '../../store';
import { addFavorites, fetchPropertyAction, } from '../../store/api-action';


type PropsForFavoritesListItem = { offer: Offer };

function FavoritesListItem(props: PropsForFavoritesListItem): JSX.Element {

  const { id, isPremium, previewImage, price, title, type, rating } = props.offer;
  // console.log('----');
  // console.log(props.offer);
  // console.log('***');
  const dispatch = useAppDispatch();
  const status = 0;
  function clickHandle() {
    dispatch(addFavorites({ id, status }));
  }

  return (
    <article className="favorites__card place-card">
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} onClick={() => { store.dispatch(fetchPropertyAction(id)); }}>
          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place offer"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button" onClick={() => { clickHandle(); }}
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: 15 * rating }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`../../offer/${id}`} onClick={() => { store.dispatch(fetchPropertyAction(id)); }}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoritesListItem;
