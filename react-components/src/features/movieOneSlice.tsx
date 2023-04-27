import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice, createAsyncThunk } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { IMovieCard, IMovieOneState, defaultMovieData } from '../types/types';

export const fetchOneMovie = createAsyncThunk<IMovieCard, number, { rejectValue: string }>(
  'movie/fetchOneMovie',
  async function (idMovie, { rejectWithValue }) {
    const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=e186f8253c4dd6e459f37348242bb754`;
    const response = await fetch(url);

    if (!response.ok) {
      return rejectWithValue('Connect to API Failed!');
    }

    const data = await response.json();

    return data as IMovieCard;
  }
);

const initialState: IMovieOneState = {
  datasMovie: defaultMovieData,
  loading2: false,
  error2: null,
};

export const movieOneSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneMovie.pending, (state) => {
        state.loading2 = true;
        state.error2 = null;
      })
      .addCase(fetchOneMovie.fulfilled, (state, action) => {
        state.datasMovie = action.payload;
        state.loading2 = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error2 = action.payload;
        state.loading2 = false;
      });
  },
});

export default movieOneSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
