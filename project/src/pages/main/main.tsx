import CardList from '../../components/card-list/card-list';
import MapLeaflet from '../../components/map-leaflet/map-leaflet';
import CityList from '../../components/city-list/city-list';
import Sort from '../../components/sort/sort';
import { useEffect, useState } from 'react';
import { Point, Offer, Points, ArrayOffers } from '../../types/types';
import { CITY_LIST } from '../../const';
import { useAppSelector } from '../../hooks';
import { filtredOffersByCity } from '../../utils/utils';

import { sortByLowToHigh, sortByHighToLow, sortByRate } from '../../utils/utils';

function Main(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);
  const originListOffers = useAppSelector((state) => state.originOffers);
  const currentListCity = filtredOffersByCity(originListOffers, currentCity);

  const [sortedOffers, setSortedOffers] = useState<ArrayOffers>(currentListCity); // отсортированные предложения (популярность, стоимость, рейтинг)

  const countOffersCity = currentListCity.length;

  const onListItemHover = (listItemName: Offer | undefined) => {

    if (listItemName) {
      setSelectedPoint({ id: listItemName.id, latitude: listItemName.location.latitude, longitude: listItemName.location.longitude });
    }
    else {
      setSelectedPoint(undefined);
    }

  };

  function changeSortTypeHandler(sortType: string) {
    let currentList = currentListCity.slice();

    switch (sortType) {
      case 'Popular': currentList = currentListCity; break;
      case 'PriceLowToHigh': currentList = sortByLowToHigh(currentList); break;
      case 'PriceHighToLow': currentList = sortByHighToLow(currentList); break;
      case 'TopRateFirst': currentList = sortByRate(currentList); break;
      default: break;
    }
    setSortedOffers(currentList);
  }

  useEffect(() => {
    // console.log('use effect Sort');
    setSortedOffers(currentListCity);
  }, [originListOffers, currentCity]);

  if (currentListCity.length === 0) { return <div></div>; }

  const centerCity = {
    title: currentListCity[0]?.city.name || 'Paris',
    latitude: currentListCity[0]?.city.location.latitude || 52.370316,
    longitude: currentListCity[0]?.city.location.longitude || 4.885168,
    zoom: currentListCity[0]?.city.location.zoom || 10,
  };

  const points: Points = currentListCity.map((offer: Offer) => ({ id: offer.id, latitude: offer.location.latitude, longitude: offer.location.longitude }));

  return (

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList cityList={CITY_LIST}></CityList>
        </section>
      </div>
      {
        !countOffersCity ?
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in {currentCity}
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
          :
          <div className="cities">
            <div className="cities__places-container container">

              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{countOffersCity} places to stay in {currentCity}</b>

                <Sort changeSortTypeHandler={changeSortTypeHandler}></Sort>
                <CardList offers={sortedOffers} onListItemHover={onListItemHover} updateNearBy={false} />

              </section>
              <div className="cities__right-section">
                <section className="cities__map">
                  <MapLeaflet centerCity={centerCity} points={points} selectedPoint={selectedPoint} />
                </section>
              </div>
            </div>
          </div>
      }

    </main>

  );
}

export default Main;
