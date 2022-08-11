import { createAction } from '@reduxjs/toolkit';


//изменение города
export const changeCity = createAction('changeCity');
//Действие для заполнения списка предложений должно поместить в хранилище все предложения по аренде
export const putListOffers = createAction('putListOffers');
//Действие для сортировок
export const putSortOffers = createAction('putSortOffers');


// const Действие = createAction ('Название_действия');
