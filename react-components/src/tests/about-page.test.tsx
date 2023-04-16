import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import AboutPage from '../routes/about-page';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';

describe('test about-page component', () => {
  test('it renders', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutPage />
        </BrowserRouter>
      </Provider>
    );

    const page = await waitFor(() => screen.getByTestId('about-page'));
    expect(page).toBeInTheDocument();
  });
});
