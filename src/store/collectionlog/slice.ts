import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionLogData } from 'src/models/CollectionLog';

export interface CollectionLogState {
  data?: CollectionLogData,
  recentItems?: any[];
  activeTab?: string;
  activeEntry?: string;
  username?: string;
  isLoaded: boolean,
  error?: string;
}

const initialState: CollectionLogState = {
  isLoaded: false,
};

const collectionLogSlice = createSlice({
  name: 'collectionLog',
  initialState: initialState,
  reducers: {
    setActiveEntry: (state, action: PayloadAction<string>) => {
      state.activeEntry = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setData: (state, action: PayloadAction<CollectionLogData>) => {
      state.data = action.payload;
      state.username = action.payload.username;

      let activeEntry = state.activeEntry;
      let activeTab = state.activeTab;

      if (!activeTab) {
        activeTab = Object.keys(action.payload.tabs)[0];
        state.activeTab = activeTab;
      }

      if (!activeEntry) {
        activeEntry = Object.keys(action.payload.tabs[activeTab])[0];
        state.activeEntry = activeEntry;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    setRecentItems: (state, action: PayloadAction<any[]>) => {
      state.recentItems = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  }
});

export const {
  setActiveEntry,
  setActiveTab,
  setData,
  setError,
  setIsLoaded,
  setUsername,
} = collectionLogSlice.actions;

export default collectionLogSlice.reducer;
