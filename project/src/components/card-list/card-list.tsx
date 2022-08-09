import Card from '../../components/card/card';
import { ArrayOffers } from '../../types/types';


type PropsForCardList = {
  offers: ArrayOffers,
  onListItemHover: (listItemName: string) => void;
};

function CardList(props: PropsForCardList): JSX.Element {

  const { offers, onListItemHover } = props;

  return (

    <div className="cities__places-list places__list tabs__content">

      {offers.map((item) => {
        //делаем ключ для карточки из id
        const keyValue = item.id;
        return (<Card key={keyValue} offer={item} onListItemHover={onListItemHover} />);
      })}

    </div>


  );
}

export default CardList;
