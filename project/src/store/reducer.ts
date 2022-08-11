import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { ArrayOffers } from '../types/types';
import { changeCity, putListOffers, putSortOffers, } from './action';
import { filtredOffersByCity } from '../utils/utils';

type InitialState = {
  city: string,
  list: ArrayOffers,
  offers: ArrayOffers,
};

const initialState: InitialState = {
  city: 'Paris',
  list: offers,
  offers: [],
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
      state.list = filtredOffersByCity(offers, state.city);
    })
    //Действие для перерисовки отсортированного списка предложений
    .addCase(putSortOffers, (state, payload) => {
      state.list = payload.payload;

    });
});

export { reducer };
