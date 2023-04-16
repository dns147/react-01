import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../../app/app';
import store from '../../app/store';

describe('test search bar component', () => {
  const inputValue = '18';
  let input: HTMLInputElement[];

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    input = screen.getAllByLabelText('Search field');
    input[0].value = inputValue;
  });

  test('check default value', () => {
    expect(input[0].value).toBe(inputValue);
  });

  test('search bar use html tag input', () => {
    expect(input[0].tagName).toBe('INPUT');
  });
});
