import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CollectionLogAPI } from '../../../api/collection-log/collection-log-api';
import { AccountType } from '../../constants';
import CacheService from '../../../services/cache';

export interface HiscoresState {
  page: number;
  accountType: AccountType | 'ALL';
  data?: Hiscores[];
  error?: string;
  isLoading: boolean;
  username?: string;
}

const initialState: HiscoresState = {
  page: 1,
  accountType: 'ALL',
  isLoading: false,
};

const cacheService = CacheService.getInstance();

export type FilterType = AccountType | 'ALL';

export const loadHiscores = createAsyncThunk(
  'hiscores/fetchHiscores',
  async (params: { page: number; filter: FilterType }) => {
    const cacheKey = 'hiscores';
    const cacheItem = cacheService.get<Hiscores[]>(cacheKey);
    if (cacheItem) {
      return cacheItem;
    }

    const { page, filter } = params;
    const api = CollectionLogAPI.getInstance();
    const response = await api.getHiscores(page, filter);
    const hiscores = response.data.hiscores;

    cacheService.add(cacheKey, hiscores);
    return hiscores;
  }
);

export const searchHiscores = createAsyncThunk(
  'hiscores/searchHiscores',
  async (params: { username: string; filter: FilterType }) => {
    const { username, filter } = params;
    const api = CollectionLogAPI.getInstance();
    const response = await api.getRankByUsername(username, filter);
    const { rank } = response.data;

    return {
      username,
      page: Math.ceil(rank / 25),
    };
  }
);

export const hiscoresSlice = createSlice({
  name: 'hiscores',
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<FilterType>) => {
      state.accountType = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHiscores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadHiscores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loadHiscores.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Unable to retrieve hiscores';
      })
      .addCase(searchHiscores.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.page = action.payload.page;
      })
      .addCase(searchHiscores.rejected, (state) => {
        state.error = 'Unable to find hiscores entry for searched username';
      });
  },
});

export const { setAccountType, setPage, setUsername } = hiscoresSlice.actions;
export default hiscoresSlice.reducer;
