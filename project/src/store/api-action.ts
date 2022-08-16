import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { store } from '../store/index';
import { loadOffers, requireAuthorization, setError, setDataLoadedStatus } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { ArrayOffers, AuthData, UserData } from '../types/types';
import { AppDispatch, State } from '../types/state';
import { store } from './index';


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
    dispatch(loadOffers(data));
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
//Возвращает информацию о статусе авторизации пользователя.

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    await api.delete(APIRoute.Logout);
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
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
