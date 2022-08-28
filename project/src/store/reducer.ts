import { createReducer } from '@reduxjs/toolkit';
import { ArrayOffers, Comments, Offer } from '../types/types';
import { changeCity, updateNearByOffer, deleteFavorite, loadFavorite, addFavorite, loadOffers, putListOffers, putSortOffers, requireAuthorization, setError, setDataLoadedStatus, loadPropertyNearby, loadProperty, loadComments } from './action';
import { filtredOffersByCity, deleteFavoriteOffer } from '../utils/utils';
import { AuthorizationStatus } from '../const';


type InitialState = {
  city: string,
  offers: ArrayOffers,
  // originOffers: ArrayOffers,
  // authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
  property: Offer | null,
  comments: Comments,
  nearby: ArrayOffers,
  favorites: ArrayOffers,
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  // originOffers: [],
  // authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
  property: null,
  comments: [],
  nearby: [],
  favorites: [],
};

// reducer - функция
//createReducer принимает initialState и вторым параметром колбек
//В колбек приходит обьект builder из RTK, builder предоставляет методы
//Все это для замены switch из голого Redux
const reducer = createReducer(initialState, (builder) => {
  builder
    //изменение города
    .addCase(changeCity, (state, payload) => {
      state.city = payload.payload;
    })
    //Действие для заполнения списка предложений должно поместить в хранилище все предложения по аренде
    .addCase(putListOffers, (state, payload) => {
      const { offers, city } = state;
      state.offers = filtredOffersByCity(offers, city);
    })
    //Действие для перерисовки отсортированного списка предложений
    .addCase(putSortOffers, (state, payload) => {
      state.offers = payload.payload;
    })
    .addCase(loadOffers, (state, payload) => {
      state.offers = payload.payload;
      state.originOffers = payload.payload;
    })
    // .addCase(requireAuthorization, (state, payload) => {
    //   state.authorizationStatus = payload.payload;
    // })
    .addCase(setError, (state, payload) => {
      state.error = payload.payload;
    })
    .addCase(setDataLoadedStatus, (state, payload) => {
      state.isDataLoaded = payload.payload;
    })
    .addCase(loadProperty, (state, payload) => {
      state.property = payload.payload;
    })
    .addCase(loadComments, (state, payload) => {
      state.comments = payload.payload;
    })
    .addCase(loadPropertyNearby, (state, payload) => {
      state.nearby = payload.payload;
    })
    .addCase(loadFavorite, (state, payload) => {
      state.favorites = payload.payload;
    })
    .addCase(addFavorite, (state, payload) => {
      // state.favorites = [...state.favorites, payload.payload];
      const offers = [...state.originOffers];
      offers.forEach((offer) => {
        if (offer.id === payload.payload.id) {
          // console.log(offer.isFavorite);
          offer.isFavorite = payload.payload.isFavorite;
          // console.log(`payload  = ${payload.payload.isFavorite} and isFavorite = ${offer.isFavorite}`);
        }
      });
      state.originOffers = offers;
    })
    .addCase(deleteFavorite, (state, payload) => {
      const offers = [...state.originOffers];
      offers.forEach((offer) => {
        if (offer.id === payload.payload.id) {
          // console.log(offer.isFavorite);
          offer.isFavorite = payload.payload.isFavorite;
          // console.log(`payload  = ${payload.payload.isFavorite} and isFavorite = ${offer.isFavorite}`);
        }
      });
      state.originOffers = offers;
    })
    .addCase(updateNearByOffer, (state, payload) => {
      const offers = [...state.nearby];
      offers.forEach((offer) => {
        if (offer.id === payload.payload.id) {
          offer.isFavorite = !payload.payload.isFavorite;
        }
      });
      state.nearby = offers;
    });
});

export { reducer };
