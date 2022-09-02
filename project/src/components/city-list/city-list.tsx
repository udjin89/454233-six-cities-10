import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity, putListOffers } from '../../store/action';

function CityList(props: { cityList: string[] }): JSX.Element {

  const currentCity = useAppSelector((state) => state.city); // Извлекаем из Redux, из состояния текущий город
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">

      {props.cityList.map((city, idx) => {
        const keyValue = `${idx}-${city}`;
        const activeCity = city === currentCity ? 'tabs__item--active' : '';

        return (
          <li key={keyValue} className="locations__item" >
            <a className={` ${activeCity} locations__item-link tabs__item`}
              href="#"
              onClick={() => {
                dispatch(changeCity(city)); // диспатчим действие changeCity
                dispatch(putListOffers(city));
              }}
            >
              <span>{city}</span>
            </a>
          </li>);
      })}
    </ul>
  );
}

export default CityList;
