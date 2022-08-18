import CardList from '../../components/card-list/card-list';
import MapLeaflet from '../../components/map-leaflet/map-leaflet';
import CityList from '../../components/city-list/city-list';
import Sort from '../../components/sort/sort';
import { useState } from 'react';
import { Point, Offer, Points } from '../../types/types';
import { CITY_LIST } from '../../const';
import { useAppSelector } from '../../hooks';
import { filtredOffersByCity } from '../../utils/utils';

function Main(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);
  const originListOffers = useAppSelector((state) => state.originOffers);

  const currentListCity = filtredOffersByCity(originListOffers, currentCity);

  const countOffersCity = currentListCity.length;

  const onListItemHover = (listItemName: any) => {
    const currentPoint1 = currentListCity.find((point) => point === listItemName);

    if (currentPoint1) {
      const currentPoint = { title: currentPoint1.title, latitude: currentPoint1.location.latitude, longitude: currentPoint1.location.longitude };
      setSelectedPoint(currentPoint);
    }
    else { setSelectedPoint(currentPoint1); }
  };


  const centerCity = {
    title: currentListCity[0].city.name,
    latitude: currentListCity[0].city.location.latitude,
    longitude: currentListCity[0].city.location.longitude,
    zoom: currentListCity[0].city.location.zoom,
  };

  const points: Points = currentListCity.map((offer: Offer) => ({ title: offer.title, latitude: offer.location.latitude, longitude: offer.location.longitude }));

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

                <Sort offers={currentListCity} originListOffers={originListOffers}></Sort>
                <CardList offers={currentListCity} onListItemHover={onListItemHover} />

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
