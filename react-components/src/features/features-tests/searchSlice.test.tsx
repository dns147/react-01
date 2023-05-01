import { describe, expect, test } from 'vitest';
import searchReducer, { setValue } from '../searchSlice';

const defaultResult = {
  value: '',
};

describe('test searchSlice', () => {
  test('should return default state when passed an empty action', () => {
    const result = searchReducer(undefined, { type: '' });

    expect(result).toEqual(defaultResult);
  });

  test('should add search value with "setValue" action', () => {
    const action = { type: setValue.type, payload: 'Redux' };

    const result = searchReducer(defaultResult, action);

    expect(result.value).toBe('Redux');
  });
});
