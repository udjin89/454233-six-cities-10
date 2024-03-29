import { createAction } from '@reduxjs/toolkit';
import { ArrayOffers, Comments, Offer } from '../types/types';
import { AuthorizationStatus } from '../const';

// const Действие = createAction ('Название_действия');

//изменение города
export const changeCity = createAction<string>('changeCity');
//Действие для заполнения списка предложений должно поместить в хранилище все предложения по аренде
export const putListOffers = createAction<string>('putListOffers');
//Действие для сортировок
export const putSortOffers = createAction<ArrayOffers>('putSortOffers');
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
//Действие по загрузке коментов
export const loadComments = createAction<Comments>('data/loadComments');

export const loadPropertyNearby = createAction<ArrayOffers>('data/loadPropertyNearby');

export const loadFavorite = createAction<ArrayOffers>('data/loadFavorite');

export const addFavorite = createAction<Offer>('data/addFavorite');

export const deleteFavorite = createAction<Offer>('data/deleteFavorite');

export const updateNearByOffer = createAction<Offer>('data/updateNearByOffer');

export const saveDataUser = createAction<string>('data/saveDataUser');

export const changeSortTypeStore = createAction<string>('data/changeSortType');

export const changeFormState = createAction<'disabled' | 'error' | 'initial'>('state/changeFormState');

export const resetState = createAction('data/resetState');
