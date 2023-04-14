import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/searchSlice';
import movieReducer from '../features/moviesSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: movieReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
