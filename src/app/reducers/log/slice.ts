import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/collection-log/collection-log-api';

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
      .addCase(loadUserSettings.fulfilled, (state, action) => {
        state.userSettings = action.payload;
      });
  },
});
export default logSlice.reducer;
