import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/collection-log/collection-log-api';
import CacheService from '../../../services/cache';

export interface LogState {
  collectionLog?: CollectionLog;
  recentItems?: CollectionLogItem[];
  isLoading: boolean;
  error?: string;
  ranks?: Ranks;
  userSettings?: UserSettings;
}

const initialState: LogState = {
  isLoading: false,
};

const cacheService = CacheService.getInstance();

export const loadCollectionLog = async (username: string) => {
  const api = CollectionLogAPI.getInstance();
  username = username.toLowerCase();
  const response = await api.getCollectionLog(username);
  const collectionLog = response.data.collectionLog;

  return collectionLog;
};

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

export const loadHiscoresRanks = createAsyncThunk(
  'log/fetchHiscoresRanks',
  async (username: string) => {
    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getRanksByUsername(username);
    return response.data.accountTypeRanks;
  }
);

export const loadUserSettings = createAsyncThunk(
  'log/fetchUserSettings',
  async (username: string) => {
    const api = CollectionLogAPI.getInstance();
    username = username.toLowerCase();
    const response = await api.getUserSettings(username);
    const userSettings = response.data.userSettings;

    return userSettings;
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
      .addCase(loadRecentItems.fulfilled, (state, action) => {
        state.recentItems = action.payload;
      })
      .addCase(loadHiscoresRanks.fulfilled, (state, action) => {
        state.ranks = action.payload as unknown as Ranks;
      })
      .addCase(loadUserSettings.fulfilled, (state, action) => {
        state.userSettings = action.payload;
      });
  },
});

export const { setError } = logSlice.actions;
export default logSlice.reducer;
