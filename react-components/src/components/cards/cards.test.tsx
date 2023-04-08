import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './card';
import '@testing-library/jest-dom';
import Cards from './cards';
import { IMovie } from '../../types/types';
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

  const data: IMovie[] = [];

  test('it renders', () => {
    render(<Card cardItem={card} />);
    expect(screen.getByText('Rocky (1976)')).toBeInTheDocument();
  });

  test('it displays a list of cards', async () => {
    render(<Cards cardsMovies={data} />);
    const cardsList = await waitFor(() => screen.getByTestId('card-list'));
    expect(cardsList).toBeInTheDocument();
  });

  test('open modal window', async () => {
    render(<Card cardItem={card} />);
    await userEvent.click(screen.getByTestId('card-item'));
    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
  });
});
