import { describe, expect, test, vi } from 'vitest';
import popularMoviesReducer, { fetchPopularMovies } from '../popularMoviesSlice';

const data = {
  poster_path: '',
  adult: false,
  overview: '',
  release_date: '',
  genre_ids: [],
  id: 0,
  original_title: '',
  original_language: '',
  title: '',
  backdrop_path: '',
  popularity: 0,
  vote_count: 0,
  video: false,
  vote_average: 0,
};

const initialState = {
  list: [],
  loading1: false,
  error1: null,
};

describe('test popularMoviesSlice', () => {
  test('should fetchPopularMovies with resolved response', async () => {
    const defaultState = [data];

    const dispatch = vi.fn();
    const thunk = fetchPopularMovies();

    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('popularMovies/fetchPopularMovies/pending');
    expect(end[0].type).toBe('popularMovies/fetchPopularMovies/fulfilled');
    expect(end[0].payload).not.toBe(defaultState);
  });

  test('should change status with "fetchPopularMovies.pending" action', async () => {
    const state = popularMoviesReducer(initialState, fetchPopularMovies.pending(''));

    expect(state.loading1).toBe(true);
    expect(state.error1).toBe(null);
  });

  test('should fetch list with "fetchPopularMovies.fulfilled" action', async () => {
    const defaultState = [data];
    const state = popularMoviesReducer(
      initialState,
      fetchPopularMovies.fulfilled(defaultState, '')
    );

    expect(state.list).toBe(defaultState);
    expect(state.loading1).toBe(false);
  });
});
