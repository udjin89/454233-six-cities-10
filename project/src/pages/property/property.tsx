import { useParams, useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import NotFound from '../notfound/notfound';
import ReviewsList from '../../components/reviews-list/reviews-list';
import MapLeaflet from '../../components/map-leaflet/map-leaflet';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { Offer, Points } from '../../types/types';
import { addFavorites, fetchPropertyAction } from '../../store/api-action';
import CardList from '../../components/card-list/card-list';
import { useEffect } from 'react';

function Property(): JSX.Element {

  //вызов хука useParams вернёт объект, среди ключей которого будет id (из пропа path)
  //в нём и будет содержаться id запрошенного предложения. Зная, id
  // можно найти его в массиве
  const params = useParams();
  const hotelId = Number(params.id);
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);
  const currentProperty = useAppSelector((state) => state.property);
  const currentComments = useAppSelector((state) => state.comments);
  const currentPoints = useAppSelector((state) => state.nearby);
  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const centerCity = currentProperty ? currentProperty.location : { latitude: 52.370216, longitude: 4.895168, zoom: 11 };

  const points: Points = currentPoints.map((offer: Offer) => ({ id: offer.id, latitude: offer.location.latitude, longitude: offer.location.longitude }));

  if (currentProperty) {
    points.push({ id: currentProperty.id, latitude: currentProperty.location.latitude, longitude: currentProperty.location.longitude });

  }

  useEffect(() => {
    if (currentProperty) {
      return;
    }

    dispatch(fetchPropertyAction(hotelId));

  }, [currentProperty, isDataLoaded]);

  if (isDataLoaded) {
    return <LoadingScreen />;
  }
  if (!currentProperty) {
    return (<NotFound />);
  }

  const { isPremium, price, title, type, rating, maxAdults, bedrooms, goods, host, description, isFavorite, id, images } = currentProperty;
  const { name, avatarUrl, isPro } = host;

  function handleClick() {
    if (isAuth === AuthorizationStatus.Auth) {
      //если isFavorite = true, то нам нужно удалить из избранного, а значит послать статус "0" и наоборот
      const status = isFavorite ? 0 : 1;
      dispatch(addFavorites({ id, status }));
      dispatch(fetchPropertyAction(id));

    }
    else {
      navigate('/login');
    }
  }

  return (

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">

            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[0]}
                alt=" studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[1]}
                alt=" studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[2]}
                alt=" studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[3]}
                alt=" studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[4]}
                alt=" studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src={images[5]}
                alt=" studio"
              />
            </div>
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className={`property__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''} `} type="button" onClick={() => { handleClick(); }}>
                <svg className={`property__bookmark-icon ${isFavorite ? 'place-card__bookmark-icon' : ''} `} width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: 30 * Math.round(rating) }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">€{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  goods.map((item: string) => {
                    const keyValue = `${item}-${hotelId}`;
                    return <li key={keyValue} className="property__inside-item">{item}</li>;
                  })
                }
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    src={avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="property__user-name">{name}</span>
                {isPro ? <span className="property__user-status">Pro</span> : ''}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              {currentComments.length ? <ReviewsList reviews={currentComments} /> : ''}
              {isAuth === AuthorizationStatus.Auth ? <Form hotelId={hotelId} /> : ''}
            </section>
          </div>
        </div>
        <section className="property__map map" >
          <MapLeaflet centerCity={centerCity} points={points} selectedPoint={{ id: currentProperty.id, latitude: currentProperty.location.latitude, longitude: currentProperty.location.longitude }} />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <CardList offers={currentPoints} updateNearBy></CardList>
        </section>
      </div>
    </main >

  );
}

export default Property;
