import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
// import { gameData } from './game-data/game-data';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
