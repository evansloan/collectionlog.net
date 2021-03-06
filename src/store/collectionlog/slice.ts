import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUrl } from '@utils/components';
import { CollectionLogData, CollectionLogItemData } from '@models/CollectionLog';

export interface CollectionLogState {
  data?: CollectionLogData;
  recentItems?: CollectionLogItemData[];
  activeTab?: string;
  activeEntry?: string;
  username?: string;
  isLoaded: boolean;
  isLoading: boolean;
  error?: string;
  ranks?: RankData;
}

interface RankData {
  total: number;
  unique: number;
}

const initialState: CollectionLogState = {
  isLoaded: false,
  isLoading: false,
};

const collectionLogSlice = createSlice({
  name: 'collectionLog',
  initialState: initialState,
  reducers: {
    setActiveEntry: (state, action: PayloadAction<string>) => {
      state.activeEntry = action.payload;
      updateUrl(action.payload);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setData: (state, action: PayloadAction<CollectionLogData>) => {
      const collectionLogData = action.payload;
      let activeEntry = state.activeEntry;
      let activeTab = state.activeTab;

      if (activeEntry) {
        for (const tabName in collectionLogData.tabs) {
          if (activeEntry in collectionLogData.tabs[tabName]) {
            activeTab = tabName;
            break;
          }
        }
      } else {
        activeTab = 'Bosses';
        activeEntry = 'Abyssal Sire';
      }

      state.data = collectionLogData;
      state.username = collectionLogData.username;
      state.activeEntry = activeEntry;
      state.activeTab = activeTab;
      state.isLoaded = true;
      state.isLoading = false;
      state.error = undefined;

      updateUrl(`/${collectionLogData.username}/${activeEntry}`);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.data = undefined;
      state.username = undefined;
      state.isLoaded = false;
      state.isLoading = false;

      updateUrl('/');
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = false;
      state.isLoading = action.payload;
    },
    setNonFatalError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setRanks: (state, action: PayloadAction<RankData>) => {
      state.ranks = action.payload;
    },
    setRecentItems: (state, action: PayloadAction<CollectionLogItemData[]>) => {
      state.recentItems = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const {
  setActiveEntry,
  setActiveTab,
  setData,
  setError,
  setIsLoading,
  setNonFatalError,
  setRanks,
  setRecentItems,
  setUsername,
} = collectionLogSlice.actions;

export default collectionLogSlice.reducer;
