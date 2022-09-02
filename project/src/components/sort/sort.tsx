import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortTypeStore } from '../../store/action';

type PropsForSort = {
  changeSortTypeHandler: (sortType: string) => void;
};

function Sort(props: PropsForSort): JSX.Element {
  const [openSortMenu, setOpenSortMenu] = useState(false); //состояние меню (открыто/закрыто)
  const currentSortType = useAppSelector((state) => state.sortType);
  const { changeSortTypeHandler } = props;
  const dispatch = useAppDispatch();

  function changeSortType(sortType: string) {
    changeSortTypeHandler(sortType);
    dispatch(changeSortTypeStore(sortType));
  }

  function changeOpenSortMenu(state: boolean) {
    setOpenSortMenu(state);
  }

  const sortTypes = new Map([
    ['Popular', 'Popular'],
    ['PriceLowToHigh', 'Price: low to high'],
    ['PriceHighToLow', 'Price: high to low'],
    ['TopRateFirst', 'Top rated first'],
  ]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by &nbsp;&nbsp;&nbsp;</span>
      <span className="places__sorting-type" onClick={(evt) => { changeOpenSortMenu(!openSortMenu); }}>
        {sortTypes.get(currentSortType)}
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
