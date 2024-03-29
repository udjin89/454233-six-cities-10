import { Link } from 'react-router-dom';
import { ArrayOffers } from '../../types/types';
import { changeCity } from '../../store/action';
import { useAppDispatch } from '../../hooks';
import FavoritesListItem from '../favorites-list-item/favorites-list-item';

type PropsForFavoritesList = { offers: ArrayOffers };

function FavoritesListByCity(props: PropsForFavoritesList): JSX.Element {

  const favoritesOffersByCity: ArrayOffers = props.offers;
  const currentCity = props.offers[0].city.name;
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(changeCity(currentCity));
  }

  return (

    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/" onClick={() => { handleClick(); }}>
            <span>{currentCity}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          favoritesOffersByCity.map((item) => {
            //делаем ключ для карточки из id
            const keyValue = item.id;
            return (<FavoritesListItem key={keyValue} offer={item} />);
          })
        }
      </div>
    </li>
  );
}

export default FavoritesListByCity;
