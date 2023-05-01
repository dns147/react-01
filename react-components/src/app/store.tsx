import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

import searchReducer from '../features/searchSlice';
import moviesReducer from '../features/moviesSlice';
import popularMoviesReducer from '../features/popularMoviesSlice';
import movieOneReducer from '../features/movieOneSlice';
import usersReducer from '../features/usersSlice';
import fileLoadReducer from '../features/fileLoadSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    movies: moviesReducer,
    popularMovies: popularMoviesReducer,
    movie: movieOneReducer,
    users: usersReducer,
    fileLoad: fileLoadReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
