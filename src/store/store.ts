import { configureStore } from '@reduxjs/toolkit';

import collectionLogReducer from './collectionlog/slice';
import hiscoresReducer from './hiscores/slice';

export const store = configureStore({
  reducer: {
    collectionLog: collectionLogReducer,
    hiscores: hiscoresReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
