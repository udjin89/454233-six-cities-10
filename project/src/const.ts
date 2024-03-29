export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_COMMENT = 10;
export const MAX_LENGTH_COMMENT = 300;
export const MIN_LENGTH_COMMENT = 50;

export const TIMEOUT_SHOW_ERROR = 3000;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const CITY_LIST = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

//Маршруты к которым будем обращаться
//Ресурсы, которые предоставляет сервер
export enum APIRoute {
  Offers = '/hotels', // Возвращает массив предложений. Каждое предложение описано в виде объекта.
  Favorite = '/favorite', //Возвращает массив предложений, добавленных в избранное.
  Login = '/login', //Возвращает информацию о статусе авторизации пользователя.
  Logout = '/logout', //Завершает сеанс работы — выход из закрытой части приложения.
  Comments = '/comments', //Возвращает список комментариев для предложения с идентификатором hotelId
}
