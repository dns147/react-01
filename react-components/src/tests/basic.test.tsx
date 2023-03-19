import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import SearchBar from '../routes/search-bar';

describe('Test Search Bar', () => {
  describe('test basic function', () => {
    const inputValue = '18';
    let input: HTMLInputElement[];

    beforeEach(() => {
      render(<SearchBar value={inputValue} />);
      input = screen.getAllByLabelText('Search field');
    });

    test('check default value', () => {
      expect(input[0].value).toBe(inputValue);
    });

    test('search bar use html tag input', () => {
      expect(input[0].tagName).toBe('INPUT');
    });

    test('user change data - value save in local storage', async () => {
      await userEvent.type(input[0], '3');
      await userEvent.type(input[0], '3');
      const valueFromLocalStorage = localStorage.getItem('inputValue');
      expect(valueFromLocalStorage).toBe('183');
    });
  });
});
