import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middleware/redirect';
import { reducer } from './reducer';
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
