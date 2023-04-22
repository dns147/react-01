import * as toolkitRaw from '@reduxjs/toolkit';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

import { PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../types/types';

export type UsersState = {
  list: IUserData[];
};

const initialState: UsersState = {
  list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserData>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
