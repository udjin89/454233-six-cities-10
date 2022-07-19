import Card from '../../components/card/card';
import { ArrayOffers } from '../../types/types';

type PropsForCardList = { offers: ArrayOffers };

function CardList(props: PropsForCardList): JSX.Element {

  // console.log('*cardlist**');
  // console.log(props.offers);
  // console.log('***');

  const offers: ArrayOffers = props.offers;
  return (

    <div className="cities__places-list places__list tabs__content">

      {offers.map((item) => {
        //делаем ключ для карточки из id
        const keyValue = item.id;
        return (<Card key={keyValue} offer={item} />);
      })}

    </div>


  );
}

export default CardList;
