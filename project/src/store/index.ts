import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';

export const api = createAPI();

// Инициализация хранилища, подключение middleware
// Подключим `redux-thunk` в список middlewares.
// Аргументом для `thunk` передадим сконфигурированный экземпляр `axios`,
// чтобы была возможность обратиться к нему из действия.
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
