import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Forms from '../routes/forms';
import userEvent from '@testing-library/user-event';

describe('test form component', () => {
  test('it renders', () => {
    render(<Forms />);
    expect(screen.getByText('Destination:')).toBeInTheDocument();
  });

  test('it displays form', async () => {
    render(<Forms />);
    const form = await waitFor(() => screen.getByTestId('data-form'));
    expect(form).toBeInTheDocument();
  });

  test('after clicking "Send" button, show warning message', async () => {
    render(<Forms />);
    await userEvent.click(screen.getByText('Send'));
    expect(screen.getByText('name must start with a capital letter')).toBeInTheDocument();
  });
});
