import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMovie, IMoviesState } from '../types/types';

const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=e186f8253c4dd6e459f37348242bb754&query';

export const fetchMovies = createAsyncThunk<IMovie[], string, { rejectValue: string }>(
  'movies/fetchMovies',
  async function (valueInput, { rejectWithValue }) {
    const url = `${API_SEARCH}=${valueInput}`;
    const response = await fetch(url);

    if (!response.ok) {
      return rejectWithValue('Connect to API Failed!');
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

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading1 = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error1 = action.payload;
        state.loading1 = false;
      });
  },
});

export default moviesSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
