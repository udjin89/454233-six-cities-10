import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import leaflet from 'leaflet';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { Points, Point, City } from '../../types/types';

type MapProps = {
  centerCity: City;
  points: Points;
  selectedPoint: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapLeaflet(props: MapProps): JSX.Element {

  const { centerCity, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCity);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section className="cities__map">
      <div className="map" style={{ height: '100%' }} ref={mapRef}></div>
    </section>
  );
}

export default MapLeaflet;
