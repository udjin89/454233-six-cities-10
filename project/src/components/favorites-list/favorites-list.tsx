
import { ArrayOffers } from '../../types/types';
import FavoritesListByCity from '../favorites-list-city/favorites-list-city';

type PropsForFavoritesList = { offers: ArrayOffers };

function FavoritesList(props: PropsForFavoritesList): JSX.Element {

  const favoritesOffers: ArrayOffers = props.offers;

  const arrayByCity: ArrayOffers[] = [];

  favoritesOffers.forEach((offer) => {
    const array = arrayByCity.find((filtredOffers) => filtredOffers[0].city.name === offer.city.name);
    // console.log(array, offer);
    if (array) {
      array.push(offer);
    } else {
      arrayByCity.push([offer]);
    }
  });
  console.log(arrayByCity);
  return (
    <ul className="favorites__list">
      {
        arrayByCity.map((offers, idx) => <FavoritesListByCity key={`index-${idx}`} offers={offers} />)
      }

    </ul>
  );
}

export default FavoritesList;
