
import { ArrayOffers } from '../../types/types';
import FavoritesListByCity from '../favorites-list-city/favorites-list-city';

type PropsForFavoritesList = { offers: ArrayOffers };

function FavoritesList(props: PropsForFavoritesList): JSX.Element {

  const favoritesOffers: ArrayOffers = props.offers;


  // let arrayFavoritesCity;
  const getArrayByCity = favoritesOffers.reduce((prev, cur) => {
    // в idx возвращается индекс первого наиденого элемента, иначе -1
    // console.log(`prev ${prev}`);
    const idx = prev.findIndex((elem) => {
      // eslint-disable-next-line
      elem[0].city.name === cur.city.name;
    });
    if (idx !== -1) { // если элемент наиден
      prev[idx].push(cur);
    }
    else {
      prev.push([cur]); //
    }
    return prev; // возвращает полученый массив
  }, []);

  // console.log(getArrayByCity);

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
