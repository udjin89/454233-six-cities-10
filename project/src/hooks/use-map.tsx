import { useEffect, useState, MutableRefObject } from 'react';
import leaflet from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: any) {
  // хук состояния
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {

    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: 52.370216,
          lng: 4.895168,
        },
        zoom: 8,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, city]);
  console.log(map);
  return map;
}

export default useMap;
