import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
// import { City, Point } from '../../types/types';
// import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { ArrayOffers } from '../../types/types';

// type MapProps = {
//   city: City;
//   points: Points;
//   selectedPoint: Point | undefined;
// };

type MapProps = { offers: ArrayOffers };

function MapLeaflet(props: MapProps): JSX.Element {

  const centerCity = props.offers[0].city;

  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCity);
  // const map = null;

  useEffect(() => {
    const layerGroup = leaflet.layerGroup();

    if (map) {
      // add markers
    }
    return () => {
      //возвращаем функцию, она удалит предыдущие маркеры. Как unmount в жизненом цикле
      if (map) {
        layerGroup.remove();
      }
    };
  }, [map]);

  return (
    <section className="cities__map map" style={{ height: '500px', background: 'pink' }} ref={mapRef}>
      {/* <div className="map" style={{ height: '500px', background: 'pink' }} ref={mapRef}></div> */}
    </section>
  );
}

export default MapLeaflet;
