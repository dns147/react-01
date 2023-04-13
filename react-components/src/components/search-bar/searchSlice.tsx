import { createSlice } from '@reduxjs/toolkit';

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

// export interface IState {
//   value: null;
// }

export const { setValue } = searchSlice.actions;

export const selectValue = (state: any) => state.value.value;

export default searchSlice.reducer;
