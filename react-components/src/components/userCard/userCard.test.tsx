import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import UserCard from './userCard';

describe('test userCard component', () => {
  const data = {
    name: 'Rocky',
    surname: 'Slay',
    date: '2023-03-24',
    planet: 'Earth',
    access: ['control', 'cargo'],
    typeCrew: 'civilian',
    category: 'Figure',
    urlFoto: 'https://i.ibb.co/SwWgMZT/luke1.jpg',
  };

  test('it renders', () => {
    render(<UserCard userCardItem={data} />);
    expect(screen.getByText('Rocky Slay')).toBeInTheDocument();
  });

  test('it displays card', async () => {
    render(<UserCard userCardItem={data} />);

    const card = await waitFor(() => screen.getByTestId('user-cards-item'));
    expect(card).toBeInTheDocument();
  });
});
