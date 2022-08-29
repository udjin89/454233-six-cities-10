import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ArrayOffers, Offer, Comments } from '../../types/types';
import { fetchOffersAction, fetchPropertyAction } from '../../store/api-action';

type InitialState = {
  offers: ArrayOffers,
  originOffers: ArrayOffers,
  isDataLoaded: boolean,
  property: Offer | null,
  comments: Comments,
  nearby: ArrayOffers,
  favorites: ArrayOffers,
};

const initialState: InitialState = {
  offers: [],
  originOffers: [],
  isDataLoaded: false,
  property: null,
  comments: [],
  nearby: [],
  favorites: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.originOffers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPropertyAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPropertyAction.fulfilled, (state, action) => {
        state.property = action.payload;
        state.isDataLoaded = false;
      });
  }
});


// export const {incrementStep, checkUserAnswer, resetGame} = gameProcess.actions;
