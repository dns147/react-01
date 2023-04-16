import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import ErrorPage from '../routes/error-page';

describe('test error-page component', () => {
  test('it renders', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ErrorPage />
        </BrowserRouter>
      </Provider>
    );

    const page = await waitFor(() => screen.getByTestId('error-page'));
    expect(page).toBeInTheDocument();
  });
});
