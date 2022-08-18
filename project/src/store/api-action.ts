import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { store } from '../store/index';
import { loadOffers, requireAuthorization, setError, setDataLoadedStatus, redirectToRoute, loadProperty, loadComments } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { ArrayOffers, AuthData, Offer, UserData, Comments } from '../types/types';
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
  async (_arg, { dispatch, extra: api }) => {
    // api - настроенный экземпляр axios
    const { data } = await api.get<ArrayOffers>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadOffers(data));// диспатчим действие по загрузке предложений
    dispatch(setDataLoadedStatus(false));
  },

  // async () => {
  //   //передаем функцию
  //   // выполняем метод get, тип содержимого, которое вернется ArrayOffers
  //   //и указываем путь к запросу APIRoute.Offers (на сервере к ресурсу)
  //   try {
  //     const { data } = await api.get<ArrayOffers>(APIRoute.Offers);
  //     store.dispatch(loadOffers(data));// диспатчим действие по загрузке предложений
  //   } catch (error) {
  //     errorHandle(error);
  //   }
  // },
);

export const fetchPropertyAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchProperty', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    // api - настроенный экземпляр axios
    // console.log(`fetchPropertyAction argument = ${_arg}`);
    toast.info(`Load, ${_arg}`, { position: 'top-center', });
    const routeProperty = APIRoute.Offers.concat(`/${_arg}`);
    const { data } = await api.get<Offer>(routeProperty);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadProperty(data));
    dispatch(fetchCommentsAction(_arg));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch, //ссылка на dispatch
  state: State,
  extra: AxiosInstance, //что приходит в extra аргументе
}>(
  'data/fetchComments', // передаем название действия
  async (_arg, { dispatch, extra: api }) => {
    // api - настроенный экземпляр axios
    // console.log(`fetchPropertyAction argument = ${_arg}`);
    toast.info(`Load coments, ${_arg}`, { position: 'top-right', });
    const routeProperty = APIRoute.Comments.concat(`/${_arg}`);
    const { data } = await api.get<Comments>(routeProperty);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadComments(data));
    dispatch(setDataLoadedStatus(false));
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
      // console.log(data);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      toast.success(`Hello, ${data.name}`, { position: 'top-center', });
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

// export const checkAuthAction = createAsyncThunk(
//   'user/checkAuth',
//   async () => {
//     try {
//       await api.get(APIRoute.Login);
//       store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     } catch (error) {
//       errorHandle(error);
//     }
//   },
// );


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Comments.concat(`/${_arg}`), { email, password });
    const { token } = data;
    saveToken(token);
    // console.log(data);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    toast.success(`Hello, ${data.name}`, { position: 'top-center', });
    dispatch(redirectToRoute('/'));
  },
);

// export const loginAction = createAsyncThunk(
//   'user/login',
//   async ({ login: email, password }: AuthData) => {
//     try {
//       const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
//       saveToken(token);
//       store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     } catch (error) {
//       errorHandle(error);
//       store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//     }
//   },
// );


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

// export const logoutAction = createAsyncThunk(
//   'user/logout',
//   async () => {
//     try {
//       await api.delete(APIRoute.Logout);
//       dropToken();
//       store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//     } catch (error) {
//       errorHandle(error);
//     }
//   },
// );

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);


export const sendCommentAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/sendComment',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    const { token } = data;
    saveToken(token);
    // console.log(data);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    toast.success(`Hello, ${data.name}`, { position: 'top-center', });
    dispatch(redirectToRoute('/'));
  },
);
