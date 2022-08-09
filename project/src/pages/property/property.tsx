import { useParams } from 'react-router-dom';
import Form from '../../components/form/form';
import NotFound from '../notfound/notfound';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ArrayOffers } from '../../types/types';
import { reviewsLIst } from '../../mocks/review';

type PropsForProperty = { offers: ArrayOffers };

function Property(props: PropsForProperty): JSX.Element {

  //вызов хука useParams вернёт объект, среди ключей которого будет id (из пропа path)
  //в нём и будет содержаться id запрошенного предложения. Зная, id
  // можно найти его в массиве
  const params = useParams();
  const offers = props.offers;

  const offer = offers.find((item) => String(item.id) === params.id);

  if (offer === undefined) {
    return (<NotFound />);
  }

  const { isPremium, price, title, type, rating, maxAdults, bedrooms, goods } = offer;
  return (

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/room.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/apartment-02.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/apartment-03.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/studio-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="property__image-wrapper">
              <img
                className="property__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
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
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: 15 * rating }} />
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
                <li className="property__inside-item">{goods[0]}</li>
                <li className="property__inside-item">Wi-Fi</li>
                <li className="property__inside-item">Washing machine</li>
                <li className="property__inside-item">Towels</li>
                <li className="property__inside-item">Heating</li>
                <li className="property__inside-item">Coffee machine</li>
                <li className="property__inside-item">Baby seat</li>
                <li className="property__inside-item">Kitchen</li>
                <li className="property__inside-item">Dishwasher</li>
                <li className="property__inside-item">Cabel TV</li>
                <li className="property__inside-item">Fridge</li>
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="property__avatar user__avatar"
                    src="img/avatar-angelina.jpg"
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="property__user-name">Angelina</span>
                <span className="property__user-status">Pro</span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  A quiet cozy and picturesque that hides behind a a river by the
                  unique lightness of Amsterdam. The building is green and from
                  18th century.
                </p>
                <p className="property__text">
                  An independent House, strategically located between Rembrand
                  Square and National Opera, but where the bustle of the city
                  comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <ReviewsList reviews={reviewsLIst} />
              <Form />
            </section>
          </div>
        </div>
        <section className="property__map map" />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img
                    className="place-card__image"
                    src="img/room.jpg"
                    width={260}
                    height={200}
                    alt="Place image"
                  />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">€80</b>
                    <span className="place-card__price-text">/&nbsp;night</span>
                  </div>
                  <button
                    className="place-card__bookmark-button place-card__bookmark-button--active button"
                    type="button"
                  >
                    <svg
                      className="place-card__bookmark-icon"
                      width={18}
                      height={19}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{ width: '80%' }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Wood and stone place</a>
                </h2>
                <p className="place-card__type">Private room</p>
              </div>
            </article>
            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img
                    className="place-card__image"
                    src="img/apartment-02.jpg"
                    width={260}
                    height={200}
                    alt="Place image"
                  />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">€132</b>
                    <span className="place-card__price-text">/&nbsp;night</span>
                  </div>
                  <button
                    className="place-card__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="place-card__bookmark-icon"
                      width={18}
                      height={19}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{ width: '80%' }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Canal View Prinsengracht</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>
            <article className="near-places__card place-card">
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img
                    className="place-card__image"
                    src="img/apartment-03.jpg"
                    width={260}
                    height={200}
                    alt="Place image"
                  />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">€180</b>
                    <span className="place-card__price-text">/&nbsp;night</span>
                  </div>
                  <button
                    className="place-card__bookmark-button button"
                    type="button"
                  >
                    <svg
                      className="place-card__bookmark-icon"
                      width={18}
                      height={19}
                    >
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{ width: '100%' }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Nice, cozy, warm big bed apartment</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>

  );
}

export default Property;
