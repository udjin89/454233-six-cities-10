import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

// Для работы с хранилищем воспользуемся хуками `useSelector` и
// `useDispatch`. Хуки взаимодействуют с Redux
//Чтобы каждый раз не типизировать запросы к стору,
// создадим типизированные версии хуков. Будем использовать их для работы
// со стором.
// useSelector - что то извлечь из хранилища
//dispatch — именно этот метод позволяет отправить действие диспетчеру и изменить состояние приложения.
