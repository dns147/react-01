import { describe, expect, test, vi } from 'vitest';
import movieOneReducer, { fetchOneMovie } from '../movieOneSlice';
import { defaultMovieData } from '../../types/types';

const initialState = {
  datasMovie: defaultMovieData,
  loading2: false,
  error2: null,
};

describe('test movieOneSlice', () => {
  test('should fetchOneMovie with resolved response', async () => {
    const defaultState = defaultMovieData;

    const dispatch = vi.fn();
    const thunk = fetchOneMovie(0);

    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('movie/fetchOneMovie/pending');
    expect(end[0].type).toBe('movie/fetchOneMovie/rejected');
    expect(end[0].payload).not.toBe(defaultState);
  });

  test('should change status with "fetchOneMovie.pending" action', async () => {
    const state = movieOneReducer(initialState, fetchOneMovie.pending('', 0));

    expect(state.loading2).toBe(true);
    expect(state.error2).toBe(null);
  });

  test('should fetch movie with "fetchOneMovie.fulfilled" action', async () => {
    const defaultState = defaultMovieData;
    const state = movieOneReducer(initialState, fetchOneMovie.fulfilled(defaultState, '', 0));

    expect(state.datasMovie).toBe(defaultState);
    expect(state.loading2).toBe(false);
  });
});
