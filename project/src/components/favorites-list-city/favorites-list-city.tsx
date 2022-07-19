
import { ArrayOffers } from '../../types/types';
import FavoritesListItem from '../favorites-list-item/favorites-list-item';

type PropsForFavoritesList = { offers: ArrayOffers };

function FavoritesListByCity(props: PropsForFavoritesList): JSX.Element {

  const favoritesOffersByCity: ArrayOffers = props.offers;
  const currentCity = props.offers[0].city.name;
  // console.log(props.offers[0].city);
  // console.log(props.offer);
  // console.log('***');

  return (

    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{currentCity}</span>
          </a>
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
