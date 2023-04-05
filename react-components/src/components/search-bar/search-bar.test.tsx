import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import SearchBar from './search-bar';
import '@testing-library/jest-dom';

describe('test search bar component', () => {
  const inputValue = '18';
  let input: HTMLInputElement[];

  beforeEach(() => {
    render(<SearchBar />);
    input = screen.getAllByLabelText('Search field');
    input[0].value = inputValue;
  });

  test('check default value', () => {
    expect(input[0].value).toBe(inputValue);
  });

  test('search bar use html tag input', () => {
    expect(input[0].tagName).toBe('INPUT');
  });

  test('user change data - value not save in local storage', async () => {
    await userEvent.type(input[0], '3');
    expect(localStorage.getItem('inputValue')).toBe('');
  });

  test('after submit - value save in local storage', async () => {
    await userEvent.click(screen.getByTestId('submit'));
    expect(localStorage.getItem('inputValue')).toBe('183');
  });
});
