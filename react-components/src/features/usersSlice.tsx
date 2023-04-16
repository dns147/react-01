import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
