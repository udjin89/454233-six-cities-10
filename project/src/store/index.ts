import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';


// Инициализация хранилища
export const store = configureStore({ reducer });
