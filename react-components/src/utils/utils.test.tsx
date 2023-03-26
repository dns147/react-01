import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { getValueCheck, isCapital } from './utils';
import Forms from '../routes/forms';

describe('test utils functions', () => {
  const smallLetter = 'w';
  const bigLetter = 'W';
  const inputValue = 'Rocky';
  let input: HTMLInputElement[];

  beforeEach(() => {
    render(<Forms />);
    input = screen.getAllByLabelText('access-input');
    input[0].checked = true;
    input[0].value = inputValue;
  });

  test('check getValueCheck function - return value if input is checked', () => {
    expect(getValueCheck(input[0])).toBe(inputValue);
  });

  test('check isCapital function - return false if letter is small', () => {
    expect(isCapital(smallLetter)).toBe(false);
  });

  test('check isCapital function - return true if letter is big', () => {
    expect(isCapital(bigLetter)).toBe(true);
  });
});
