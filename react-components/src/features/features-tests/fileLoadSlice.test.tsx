import { describe, expect, test, vi } from 'vitest';
import fileLoadReducer, { fetchLoadFile } from '../fileLoadSlice';

const initialState = {
  file: '',
  loading: false,
  error: null,
};

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('test fileLoadSlice', () => {
  test('should fetchLoadFile with resolved response', async () => {
    const defaultState = 'data:image/png;base64,aGVsbG8=';

    const dispatch = vi.fn();
    const thunk = fetchLoadFile(file);

    await thunk(
      dispatch,
      () => ({}),
      () => ({})
    );

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('file/fetchLoadFile/pending');
    expect(end[0].type).toBe('file/fetchLoadFile/fulfilled');
    expect(end[0].payload).toBe(defaultState);
  });

  test('should change status with "fetchLoadFile.pending" action', async () => {
    const state = fileLoadReducer(initialState, fetchLoadFile.pending('', file));

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('should load file with "fetchLoadFile.fulfilled" action', async () => {
    const defaultState = '';
    const state = fileLoadReducer(initialState, fetchLoadFile.fulfilled('', '', file));

    expect(state.file).toBe(defaultState);
    expect(state.loading).toBe(false);
  });
});
