import CardList from '../../components/card-list/card-list';
import MapLeaflet from '../../components/map-leaflet/map-leaflet';
import CityList from '../../components/city-list/city-list';
import Sort from '../../components/sort/sort';
import { useState } from 'react';
import { ArrayOffers, Point, Offer, Points } from '../../types/types';
import { CITY_LIST } from '../../const';
import { useAppSelector } from '../../hooks';

type PropsForMain = { offers: ArrayOffers };

function Main(props: PropsForMain): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const onListItemHover = (listItemName: any) => {
    const currentPoint1 = props.offers.find((point) => point === listItemName);

    if (currentPoint1) {
      const currentPoint = { title: currentPoint1.title, latitude: currentPoint1.location.latitude, longitude: currentPoint1.location.longitude };
      setSelectedPoint(currentPoint);
    }
    else { setSelectedPoint(currentPoint1); }
  };


  const currentCity = useAppSelector((state) => state.city);
  const currentListCity = useAppSelector((state) => state.list);
  const countOffersCity = currentListCity.length;
  const originListOffers = props.offers;

  const centerCity = {
    title: props.offers[0].city.name,
    latitude: props.offers[0].city.location.latitude,
    longitude: props.offers[0].city.location.longitude,
    zoom: props.offers[0].city.location.zoom,
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
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{countOffersCity} places to stay in {currentCity}</b>

            <Sort offers={currentListCity} originListOffers={originListOffers}></Sort>
            <CardList offers={currentListCity} onListItemHover={onListItemHover} />

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
