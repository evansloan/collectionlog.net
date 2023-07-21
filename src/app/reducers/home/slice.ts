import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/collection-log/collection-log-api';
import TwitchAPI from '../../../api/twitch/twitch-api';
import CacheService from '../../../services/cache';

export interface HomeState {
  recentItems?: CollectionLogItem[];
  userCount: number;
  isLoading: boolean;
  streams?: any[];
}

const initialState: HomeState = {
  recentItems: [],
  userCount: 0,
  isLoading: false,
};

const cacheService = CacheService.getInstance();

export const loadUserCount = createAsyncThunk(
  'home/fetchUserCounts',
  async () => {
    const cacheKey = 'user-count';
    const cacheItem = cacheService.get<number>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const api = CollectionLogAPI.getInstance();
    const response = await api.getUserCount();
    const count = response.data.count;

    cacheService.add(cacheKey, count, CacheService.DEFAULT_TTL * 2);
    return count;
  }
);

export const loadStreams = createAsyncThunk(
  'home/loadStreams',
  async () => {
    const cacheKey = 'streams';
    const cacheItem = cacheService.get<any[]>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const api = TwitchAPI.getInstance();
    const streams = await api.getStreams();

    cacheService.add(cacheKey, streams);
    return streams;
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserCount.fulfilled, (state, action) => {
        state.userCount = action.payload;
      })
      .addCase(loadStreams.fulfilled, (state, action) => {
        state.streams = action.payload;
      });
  },
});

export default homeSlice.reducer;
