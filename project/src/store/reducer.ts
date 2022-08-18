import { createReducer } from '@reduxjs/toolkit';
import { ArrayOffers, Offer } from '../types/types';
import { changeCity, loadOffers, putListOffers, putSortOffers, requireAuthorization, setError, setDataLoadedStatus, loadProperty } from './action';
import { filtredOffersByCity } from '../utils/utils';
import { AuthorizationStatus } from '../const';


type InitialState = {
  city: string | undefined,
  offers: ArrayOffers,
  originOffers: ArrayOffers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
  property: Offer | null,
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  originOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
  property: null,
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
      state.originOffers = payload.payload;
    })
    .addCase(requireAuthorization, (state, payload) => {
      state.authorizationStatus = payload.payload;
    })
    .addCase(setError, (state, payload) => {
      state.error = payload.payload;
    })
    .addCase(setDataLoadedStatus, (state, payload) => {
      state.isDataLoaded = payload.payload;
    })
    .addCase(loadProperty, (state, payload) => {
      state.property = payload.payload;
    });
});

export { reducer };
