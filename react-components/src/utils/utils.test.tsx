import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { defaultCheckedInputs, isCapital } from './utils';
import Forms from '../routes/forms';

describe('test utils functions', () => {
  const smallLetter = 'w';
  const bigLetter = 'W';
  let input: HTMLInputElement[];

  beforeEach(() => {
    render(<Forms />);
    input = screen.getAllByLabelText('access-input');
    input[0].checked = true;
  });

  test('check defaultCheckedInputs function - reset input if input is checked', () => {
    defaultCheckedInputs([input[0]]);
    expect(input[0].checked).toBe(false);
  });

  test('check isCapital function - return false if letter is small', () => {
    expect(isCapital(smallLetter)).toBe(false);
  });

  test('check isCapital function - return true if letter is big', () => {
    expect(isCapital(bigLetter)).toBe(true);
  });
});
