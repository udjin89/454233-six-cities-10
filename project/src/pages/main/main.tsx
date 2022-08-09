import CardList from '../../components/card-list/card-list';
import MapLeaflet from '../../components/map-leaflet/map-leaflet';
import { useState } from 'react';
import { ArrayOffers, Point, Offer, Points } from '../../types/types';

type PropsForMain = { offers: ArrayOffers };

function Main(props: PropsForMain): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const points: Points = props.offers.map((offer: Offer) => ({ title: offer.title, latitude: offer.location.latitude, longitude: offer.location.longitude }));

  const onListItemHover = (listItemName: any) => {
    const currentPoint1 = props.offers.find((point) => point === listItemName);

    if (currentPoint1) {
      const currentPoint = { title: currentPoint1.title, latitude: currentPoint1.location.latitude, longitude: currentPoint1.location.longitude };
      setSelectedPoint(currentPoint);
    }
    else { setSelectedPoint(currentPoint1); }
  };

  const centerCity = {
    title: props.offers[0].city.name,
    latitude: props.offers[0].city.location.latitude,
    longitude: props.offers[0].city.location.longitude,
    zoom: props.offers[0].city.location.zoom,
  };

  // const offersForCity = props.offers.filter();

  return (

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li
                  className="places__option places__option--active"
                  tabIndex={0}
                >
                  Popular
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: low to high
                </li>
                <li className="places__option" tabIndex={0}>
                  Price: high to low
                </li>
                <li className="places__option" tabIndex={0}>
                  Top rated first
                </li>
              </ul>
            </form>

            <CardList offers={props.offers} onListItemHover={onListItemHover} />

          </section>
          <div className="cities__right-section">

            <MapLeaflet centerCity={centerCity} points={points} selectedPoint={selectedPoint} />

          </div>
        </div>
      </div>
    </main>

  );
}

export default Main;
