import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import logReducer from './reducers/log/slice';
import homeReducer from './reducers/home/slice';

export const store = configureStore({
  reducer: {
    log: logReducer,
    home: homeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
