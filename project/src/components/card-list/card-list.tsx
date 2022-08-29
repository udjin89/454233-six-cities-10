import Card from '../../components/card/card';
import { ArrayOffers, Offer } from '../../types/types';


type PropsForCardList = {
  offers: ArrayOffers,
  onListItemHover?: (listItemName: Offer | undefined) => void;
  updateNearBy: boolean,
};

function CardList(props: PropsForCardList): JSX.Element {

  const { offers, onListItemHover, updateNearBy } = props;

  return (
    <div className={`${updateNearBy ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}`} >

      {offers.map((item) => {
        //делаем ключ для карточки из id
        const keyValue = item.id;
        return (<Card key={keyValue} offer={item} onListItemHover={onListItemHover} updateNearBy={updateNearBy} />);
      })}

    </div>


  );
}

export default CardList;
