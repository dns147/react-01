import * as toolkitRaw from '@reduxjs/toolkit';
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const { configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

import searchReducer from '../features/searchSlice';
import moviesReducer from '../features/moviesSlice';
import movieOneReducer from '../features/movieOneSlice';
import usersReducer from '../features/usersSlice';
import fileLoadReducer from '../features/fileLoadSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    movie: movieOneReducer,
    users: usersReducer,
    fileLoad: fileLoadReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
