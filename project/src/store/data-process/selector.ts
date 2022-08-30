
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { ArrayOffers } from '../../types/types';

export const getOffers = (state: State): ArrayOffers => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
