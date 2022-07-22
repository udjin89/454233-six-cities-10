import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { City, Point } from '../../types/types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { ArrayOffers } from '../../types/types';

// type MapProps = {
//   city: City;
//   points: Points;
//   selectedPoint: Point | undefined;
// };

type MapProps = { offers: ArrayOffers };

function MapLeaflet(props: MapProps): JSX.Element {

  const centerCity = props.offers[0].city;
  console.log(props.offers[0].city)
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCity);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const layerGroup = leaflet.layerGroup();

    if (map) {

    }
    return () => {
      if (map) {
        layerGroup.remove();
      }
    };
  }, [map]);

  return (
    <section className="cities__map map" style={{ background: 'pink' }} ref={mapRef}>

    </section>
  );
}

export default MapLeaflet;
