import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/log-api';

export interface HomeState {
  recentItems?: CollectionLogItem[];
  userCount: number;
  isLoading: boolean;
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
      });
  },
});

export default homeSlice.reducer;
