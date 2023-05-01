import { describe, expect, test, vi } from 'vitest';
import moviesReducer, { fetchMovies } from '../moviesSlice';

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

describe('test moviesSlice', () => {
  test('should fetchMovies with resolved response', async () => {
    const defaultState = [data];

    const dispatch = vi.fn();
    const thunk = fetchMovies('Rocky');

    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('movies/fetchMovies/pending');
    expect(end[0].type).toBe('movies/fetchMovies/fulfilled');
    expect(end[0].payload).not.toBe(defaultState);
  });

  test('should change status with "fetchMovies.pending" action', async () => {
    const state = moviesReducer(initialState, fetchMovies.pending('', ''));

    expect(state.loading1).toBe(true);
    expect(state.error1).toBe(null);
  });

  test('should fetch list with "fetchMovies.fulfilled" action', async () => {
    const defaultState = [data];
    const state = moviesReducer(initialState, fetchMovies.fulfilled(defaultState, '', ''));

    expect(state.list).toBe(defaultState);
    expect(state.loading1).toBe(false);
  });
});
