import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
// Создаем новые псевдонимы типа, для store -> State, AppDispatch
// ReturnType позволяет получить тип возращаемого значения функции
//getState функция, которая возвращает нам состояние, на основе ее определяем тип
// теперь не придется вручную делать типизацию для хранилища
export type State = ReturnType<typeof store.getState>;
// для стандартного метода .dispatch
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};
