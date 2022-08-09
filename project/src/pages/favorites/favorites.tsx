import FavoritesList from '../../components/favorites-list/favorites-list';
import { ArrayOffers } from '../../types/types';

type PropsForFavorites = { offers: ArrayOffers };

function Favorites(props: PropsForFavorites): JSX.Element {
  // console.log(props.offers.length);
  if (!props.offers.length) {
    return (
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }
  else {

    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={props.offers} />
          </section>
        </div>
      </main>
    );
  }

}

export default Favorites;
