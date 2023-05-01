import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './card';
import '@testing-library/jest-dom';
import Cards from './cards';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('test cards component', () => {
  const card = {
    id: 1,
    title: 'Rocky',
    release_date: '1976-11-10',
    poster_path: '/hEjK9A9BkNXejFW4tfacVAEHtkn.jpg',
    adult: false,
    overview: '',
    original_title: '',
    original_language: '',
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
    genre_ids: [],
    backdrop_path: '',
  };

  const index = 0;

  test('loader not renders', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card id={index} cardItem={card} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByText('No Movies Found!')).not.toBeInTheDocument();
  });

  test('it displays "No Movies Found!" if not found movies', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cards />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('No Movies Found!')).toBeInTheDocument();
  });

  test('it render a card', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card id={index} cardItem={card} />
        </BrowserRouter>
      </Provider>
    );

    const cardItem = await waitFor(() => screen.getByTestId('card-item'));
    expect(cardItem).toBeInTheDocument();
  });

  test('open modal window', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card id={index} cardItem={card} />
        </BrowserRouter>
      </Provider>
    );

    const cardItem = await waitFor(() => screen.getByTestId('card-item'));
    expect(cardItem).toBeInTheDocument();

    await userEvent.click(cardItem);

    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
  });
});
