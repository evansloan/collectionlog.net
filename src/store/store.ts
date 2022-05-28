import { configureStore } from '@reduxjs/toolkit';

import collectionLogReducer from './collectionlog/slice';

export const store = configureStore({
  reducer: {
    collectionLog: collectionLogReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
