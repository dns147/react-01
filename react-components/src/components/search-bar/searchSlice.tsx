import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: '',
  },
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  },
});

export interface IState {
  search: {
    value: string
  };
}

export const { setValue } = searchSlice.actions;

export const selectValue = (state: IState) => state.search.value;

export default searchSlice.reducer;
