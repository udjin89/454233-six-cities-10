import { createAction } from '@reduxjs/toolkit';
import { ArrayOffers, Offer } from '../types/types';
import { AuthorizationStatus } from '../const';

// const Действие = createAction ('Название_действия');

//изменение города
export const changeCity = createAction<string>('changeCity');
//Действие для заполнения списка предложений должно поместить в хранилище все предложения по аренде
export const putListOffers = createAction('putListOffers');
//Действие для сортировок
export const putSortOffers = createAction('putSortOffers');
//Действие для загрузки списка предложений
export const loadOffers = createAction<ArrayOffers>('data/loadOffers');
//Действие для авторизации
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
//Действие для установления ошибки
export const setError = createAction<string | null>('setError');
//Действие установки статуса загрузки (загружается или уже загружено)
export const setDataLoadedStatus = createAction<boolean>('data/LoadedStatus');
//Действие перенаправления
export const redirectToRoute = createAction<string>('redirectToRoute');
//Действие по загрузке предложения(property)
export const loadProperty = createAction<Offer>('data/loadProperty');
