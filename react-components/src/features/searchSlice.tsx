import * as toolkitRaw from '@reduxjs/toolkit';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

import { PayloadAction } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = searchSlice.actions;

export default searchSlice.reducer;
