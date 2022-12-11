import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/log-api';
import TwitchAPI from '../../../api/twitch/twitch-api';

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

export const loadRecentItemsGlobal = createAsyncThunk(
  'home/fetchRecentItemsGlobal',
  async () => {
    const api = CollectionLogAPI.getInstance();
    const response = await api.getRecentItemsGlobal();
    return response.data.items;
  }
);

export const loadUserCount = createAsyncThunk(
  'home/fetchUserCounts',
  async () => {
    const api = CollectionLogAPI.getInstance();
    const response = await api.getUserCount();
    return response.data.count;
  }
);

export const loadStreams = createAsyncThunk(
  'home/loadStreams',
  async () => {
    const api = TwitchAPI.getInstance();
    const streams = await api.getStreams();
    return streams;
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRecentItemsGlobal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadRecentItemsGlobal.fulfilled, (state, action) => {
        state.recentItems = action.payload;
        state.isLoading = false;
      })
      .addCase(loadRecentItemsGlobal.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadUserCount.fulfilled, (state, action) => {
        state.userCount = action.payload;
      })
      .addCase(loadStreams.fulfilled, (state, action) => {
        state.streams = action.payload;
      });
  },
});

export default homeSlice.reducer;
