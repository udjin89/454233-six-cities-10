import { useState } from 'react';
import { ArrayOffers } from '../../types/types';
import { sortByLowToHigh, sortByHighToLow, sortByRate } from '../../utils/utils';
import { putSortOffers } from '../../store/action';
import { useAppDispatch } from '../../hooks';

function Sort(props: { offers: ArrayOffers, originListOffers: ArrayOffers }): JSX.Element {
  const originOffers = props.offers.slice(); // копируем все предложения, для сброса
  const [openSortMenu, setOpenSortMenu] = useState(false); //состояние меню (открыто/закрыто)
  const [currentSortType, setSortType] = useState('Popular');//текущию тип сортировки
  const dispatch = useAppDispatch(); //просто обертка для удобного использования dispatch

  function changeSortType(sortType: string) {

    let currentList = originOffers.slice();

    switch (sortType) {
      case 'Popular': currentList = props.originListOffers; break;
      case 'PriceLowToHigh': currentList = sortByLowToHigh(currentList); break;
      case 'PriceHighToLow': currentList = sortByHighToLow(currentList); break;
      case 'TopRateFirst': currentList = sortByRate(currentList); break;
      default: break;
    }
    setSortType(sortType);
    dispatch(putSortOffers(currentList));

  }
  function changeOpenSortMenu(state: boolean) {
    setOpenSortMenu(state);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={(evt) => { changeOpenSortMenu(!openSortMenu); }}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${openSortMenu ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${currentSortType === 'Popular' ? 'places__option--active' : ''}`} onClick={(evt) => { changeSortType('Popular'); changeOpenSortMenu(false); }}>Popular</li>
        <li className={`places__option ${currentSortType === 'PriceLowToHigh' ? 'places__option--active' : ''}`} onClick={(evt) => { changeSortType('PriceLowToHigh'); changeOpenSortMenu(false); }}>Price: low to high</li>
        <li className={`places__option ${currentSortType === 'PriceHighToLow' ? 'places__option--active' : ''}`} onClick={(evt) => { changeSortType('PriceHighToLow'); changeOpenSortMenu(false); }}>Price: high to low</li>
        <li className={`places__option ${currentSortType === 'TopRateFirst' ? 'places__option--active' : ''}`} onClick={(evt) => { changeSortType('TopRateFirst'); changeOpenSortMenu(false); }}>Top rated first</li>
      </ul>
    </form >
  );
}

export default Sort;
