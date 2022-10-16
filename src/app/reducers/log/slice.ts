import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/log-api';

export interface LogState {
  collectionLog?: CollectionLog;
  recentItems?: CollectionLogItem[];
  isLoading: boolean;
  error?: string;
  rank?: number;
}

const initialState: LogState = {
  isLoading: false,
};

export const loadCollectionLog = createAsyncThunk(
  'log/fetchLog',
  async (username: string) => {
    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getCollectionLog(username);
    return response.data.collectionLog;
  }
);

export const loadRecentItems = createAsyncThunk(
  'log/fetchRecentItems',
  async (username: string) => {
    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getRecentItems(username);
    return response.data.items;
  }
);

export const loadHiscoresRank = createAsyncThunk(
  'log/fetchHiscoresRank',
  async (username: string) => {
    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getRankByUsername(username);
    return response.data.rank;
  }
);

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCollectionLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCollectionLog.fulfilled, (state, action) => {
        state.collectionLog = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(loadCollectionLog.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Error connecting to api.collectionlog.net';
      })
      .addCase(loadRecentItems.fulfilled, (state, action) => {
        state.recentItems = action.payload;
      })
      .addCase(loadHiscoresRank.fulfilled, (state, action) => {
        state.rank = action.payload;
      });
  },
});

export const { setError } = logSlice.actions;
export default logSlice.reducer;
