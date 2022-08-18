import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        // если пришло действие redirectToRoute
        if (action.type === 'redirectToRoute') {
          // Перенаправляем на путь, который в payload
          browserHistory.push(action.payload);
        }

        return next(action);
      };
