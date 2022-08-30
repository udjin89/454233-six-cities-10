import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { processErrorHandle } from '../services/process-handle-error';
import { loadOffers, addFavorite, deleteFavorite, loadFavorite, requireAuthorization, setError, setDataLoadedStatus, redirectToRoute, loadProperty, loadComments, loadPropertyNearby } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { ArrayOffers, AuthData, Offer, UserData, Comments, CommentData } from '../types/types';
import { AppDispatch, State } from '../types/state';
import { store } from './index';
import { toast } from 'react-toastify';


//Создаем асинхронное действие с помощью createAsyncThunk
// createAsyncThunk<...> - передаем необходимую инфу о типах
export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchOffers', // передаем название действия
  async (_arg, { dispatch, getState, extra: api }) => {
    // api - настроенный экземпляр axios
    const { data } = await api.get<ArrayOffers>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));// диспатчим действие по загрузке предложений
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchPropertyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchProperty', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    // api - настроенный экземпляр axios
    toast.info(`Load, ${_arg}`, { position: 'top-center', });
    const routeProperty = APIRoute.Offers.concat(`/${_arg}`);
    const { data } = await api.get<Offer>(routeProperty);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadProperty(data));
    dispatch(fetchCommentsAction(_arg));
    dispatch(fetchPropertyNearby(_arg));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchComments', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    toast.info(`Load coments, ${_arg}`, { position: 'top-right', });
    const routeProperty = APIRoute.Comments.concat(`/${_arg}`);
    const { data } = await api.get<Comments>(routeProperty);
    dispatch(loadComments(data));
  },
);

//Возвращает информацию о статусе авторизации пользователя.
export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(fetchFavorites());
      toast.success(`Hello, ${data.name} `, { position: 'top-center', });
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    const { token } = data;
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    toast.success(`Hello, ${data.name}`, { position: 'top-center', });
    dispatch(redirectToRoute('/'));
  },
);


export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);


export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const sendCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/sendComment',
  async ({ hotelId, comment, rating }, { dispatch, extra: api }) => {
    try {
      await api.post<UserData>(APIRoute.Comments.concat(`/${hotelId}`), { comment, rating });
      dispatch(fetchCommentsAction(hotelId));
      toast.success(`Load coments SUCCESS, id=${hotelId}`, { position: 'top-right', });
    }
    catch (error) {
      toast.info(`Load coments, ${error}`, { position: 'top-right', });
    }
  },
);


export const fetchPropertyNearby = createAsyncThunk<void, number, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchPropertyNearby', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    // api - настроенный экземпляр axios
    // console.log(`fetchPropertyAction argument = ${_arg}`);
    const routePropertyNearby = APIRoute.Offers.concat(`/${_arg}/`).concat('nearby');
    try {
      const { data } = await api.get<ArrayOffers>(routePropertyNearby);
      dispatch(loadPropertyNearby(data));
      toast.info(`Load Offers NearBY, id=${_arg}`, { position: 'top-right', });
    }
    catch {
      processErrorHandle('error');
    }
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchFavorites', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ArrayOffers>(APIRoute.Favorite);
      dispatch(loadFavorite(data));
    }
    catch {
      processErrorHandle('error');
    }
  },
);

export const addFavorites = createAsyncThunk<boolean, { id: number, status: number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/addFavorites',
  async ({ id, status }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Offer>(APIRoute.Favorite.concat(`/${id}/${status}`), {});
      // console.log(data, status);
      if (status) {
        dispatch(addFavorite(data));
      } else {
        dispatch(deleteFavorite(data));
      }
      dispatch(fetchFavorites());
      toast.success(`Add favorite SUCCESS, id=${id} status = ${status}`, { position: 'top-left', });
      return true;
    }
    catch (error) {
      toast.error(`Error  add favorite, ${error}`, { position: 'top-right', });
      return false;
    }
  },
);
