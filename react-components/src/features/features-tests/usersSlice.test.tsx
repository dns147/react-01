import { describe, expect, test } from 'vitest';
import usersReducer, { addUser } from '../usersSlice';

const defaultResult = {
  list: [],
};

describe('test usersSlice', () => {
  test('should return default state when passed an empty action', () => {
    const result = usersReducer(undefined, { type: '' });

    expect(result).toEqual(defaultResult);
  });

  test('should add user with "addUser" action', () => {
    const action = { type: addUser.type, payload: 'Redux' };

    const result = usersReducer(defaultResult, action);

    expect(result.list).toEqual(['Redux']);
  });
});
