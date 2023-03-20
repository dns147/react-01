import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import Card from '../routes/card';
import SearchBar from '../routes/search-bar';
import '@testing-library/jest-dom';
import Cards from '../routes/cards';
import cardsData from '../assets/json/data.json';

describe('test search bar component', () => {
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
      expect(localStorage.getItem('inputValue')).toBe('183');
    });
  });
});

describe('test cards component', () => {
  const card = {
    id: 1,
    title: 'Training Luke with Yoda',
    description:
      'Celebrate the most stellar fandom of them all with the Empire Strikes Back Pop! of Luke carrying Master Yoda on his back. Collectible stands 3.75-inches tall.',
    price: 15,
    stock: 44,
    brand: 'Funko Pop!',
    category: 'Figure',
    images: 'https://i.ibb.co/SwWgMZT/luke1.jpg',
  };

  test('it renders', () => {
    render(<Card item={card} />);
    expect(screen.getByText('Training Luke with Yoda')).toBeInTheDocument();
  });

  test('it displays a list of cards', async () => {
    render(<Cards cards={cardsData} />);

    const cardsList = await waitFor(() => screen.getByTestId('card-list'));
    expect(cardsList).toBeInTheDocument();
  });
});
