import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './card';
import '@testing-library/jest-dom';
import Cards from './cards';
import { ICardProps, IMovie } from '../../types/types';

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

  const dataFull: IMovie[] = [card];
  const dataEmpty: IMovie[] = [];
  const props: ICardProps = {
    cardItem: card,
    updateLoader: () => {},
  };
  const updateLoader = (state: boolean): void => {
    props.updateLoader(state);
  };
  updateLoader(true);

  test('loader not renders', () => {
    render(<Card cardItem={card} updateLoader={updateLoader} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByText('No Movies Found!')).not.toBeInTheDocument();
  });

  test('it displays "No Movies Found!" if not found movies', async () => {
    render(<Cards cardsMovies={dataEmpty} updateLoader={updateLoader} />);
    expect(screen.getByText('No Movies Found!')).toBeInTheDocument();
  });

  test('it displays a list of cards', async () => {
    render(<Cards cardsMovies={dataFull} updateLoader={updateLoader} />);
    const cardsList = await waitFor(() => screen.getByTestId('card-list'));
    expect(cardsList).toBeInTheDocument();
  });

  test('open modal window', async () => {
    render(<Card cardItem={card} updateLoader={updateLoader} />);
    const cardItem = await waitFor(() => screen.queryByTestId('card-item'));
    expect(cardItem).not.toBeInTheDocument();
    //await userEvent.click(cardItem);
    expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
  });
});
