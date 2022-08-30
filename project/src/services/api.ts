import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { getToken } from './token';
// import { processErrorHandle } from './process-handle-error';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const shouldDisplayError = (response: AxiosResponse) => true; //!!StatusCodeMapping[response.status]

// axios пакет для работы с запросами
//возвращает настроенный экземпляр axios
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  //перехватчик на запрос(request)
  //код всегда будет выполняться перед отправкой запроса
  //отправляем всегда с каждым запросом
  // передаем функцию, которая возвращает новую конфигурацию
  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken(); //считываем токен из localStorage

      //если токен есть, создаем заголовок x-token, куда его записываем
      if (token) {
        config.headers['x-token'] = token;
      }
      //конфиг будет вмерджин в конфигурацию запроса
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error, { position: 'top-center', });
      }

      throw error;
    }
  );

  return api;
};
