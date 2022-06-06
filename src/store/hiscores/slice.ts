import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUrl } from '@utils/components';
import { HiscoresData } from '@models/Hiscores';

export type HiscoresType = 'total' | 'unique';

export interface HiscoresState {
  type: HiscoresType
  page: number;
  filter: string;
  data?: any[];
  error?: string | null;
  isLoaded: boolean;
}

const initialState: HiscoresState = {
  type: 'total',
  page: 1,
  filter: 'all',
  isLoaded: false,
};

const hiscoresSlice = createSlice({
  name: 'hiscores',
  initialState: initialState,
  reducers: {
    setData: (state, action: PayloadAction<HiscoresData[]>) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setType: (state, action: PayloadAction<HiscoresType>) => {
      state.type = action.payload;
    }
  }
});

export const {
  setData,
  setFilter,
  setPage,
  setType,
} = hiscoresSlice.actions;

export default hiscoresSlice.reducer;
