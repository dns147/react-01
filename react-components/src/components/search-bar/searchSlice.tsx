import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: null,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    }
  },
});

export interface IState {
  value: '';
}

export const { setValue } = searchSlice.actions;

export const selectValue = (state: IState) => state.value;

export default searchSlice.reducer;
