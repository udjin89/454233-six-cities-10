
import { ArrayOffers } from '../../types/types';
import FavoritesListByCity from '../favorites-list-city/favorites-list-city';

type PropsForFavoritesList = { offers: ArrayOffers };

function FavoritesList(props: PropsForFavoritesList): JSX.Element {

  const favoritesOffers: ArrayOffers = props.offers;
  // console.log('----');
  // console.log(props.offer);
  // console.log('***');
  const getArrayByCity = favoritesOffers.reduce((a, c) => {
    const idx = a.findIndex((elem) => elem[0].city.name === c.city.name);
    if (idx !== -1) {
      a[idx].push(c);
    }
    else {
      a.push([c]);
    }
    return a;
  }, []);

  console.log(getArrayByCity);

  return (
    <ul className="favorites__list">
      {
        getArrayByCity.map((elem, idx) => {
          const keyValue = `${idx}`;
          return (<FavoritesListByCity key={keyValue} offers={elem} />);
        })
      }

    </ul>
  );
}

export default FavoritesList;
