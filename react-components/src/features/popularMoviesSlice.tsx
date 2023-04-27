import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice, createAsyncThunk } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IMovie, IMoviesState } from '../types/types';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=e186f8253c4dd6e459f37348242bb754';

export const fetchPopularMovies = createAsyncThunk<IMovie[]>(
  'popularMovies/fetchPopularMovies',
  async function () {
    const response = await fetch(API_URL);

    if (!response.ok) {
      return 'Connect to API Failed!';
    }

    const data = await response.json();

    return data.results;
  }
);

const initialState: IMoviesState = {
  list: [],
  loading1: false,
  error1: null,
};

export const popularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading1 = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error1 = action.payload;
        state.loading1 = false;
      });
  },
});

export default popularMoviesSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
