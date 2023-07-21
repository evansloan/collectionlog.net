import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
      .addCase(loadStreams.fulfilled, (state, action) => {
        state.streams = action.payload;
      });
  },
});

export default homeSlice.reducer;
