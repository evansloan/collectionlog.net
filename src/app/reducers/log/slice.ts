import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/collection-log/collection-log-api';
import CacheService from '../../../services/cache';

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

const cacheService = CacheService.getInstance();

export const loadCollectionLog = createAsyncThunk(
  'log/fetchLog',
  async (username: string) => {
    const cacheKey = `collection-log-${username}`;
    const cacheItem = cacheService.get<CollectionLog>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getCollectionLog(username);
    const collectionLog = response.data.collectionLog;

    cacheService.add(cacheKey, collectionLog);
    return collectionLog;
  }
);

export const loadRecentItems = createAsyncThunk(
  'log/fetchRecentItems',
  async (username: string) => {
    const cacheKey = `recent-items-${username}`;
    const cacheItem = cacheService.get<CollectionLogItem[]>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getRecentItems(username);
    const items = response.data.items;

    cacheService.add(cacheKey, items);
    return items;
  }
);

export const loadHiscoresRank = createAsyncThunk(
  'log/fetchHiscoresRank',
  async (username: string) => {
    const cacheKey = `hiscores-rank-${username}`;
    const cacheItem = cacheService.get<number>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getRankByUsername(username);
    const rank = response.data.rank;

    cacheService.add(cacheKey, rank);
    return rank;
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
