import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './card';
import '@testing-library/jest-dom';
import Cards from './cards';

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
    render(<Card cardItem={card} />);
    expect(screen.getByText('Training Luke with Yoda')).toBeInTheDocument();
  });

  test('it displays a list of cards', async () => {
    render(<Cards />);

    const cardsList = await waitFor(() => screen.getByTestId('card-list'));
    expect(cardsList).toBeInTheDocument();
  });
});
