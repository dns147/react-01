import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Modal from './modal';

describe('test modal component', () => {
  const id = 1;
  const setOpen = () => {};

  test('close modal window', async () => {
    expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
    render(<Modal setOpen={setOpen} idMovie={id} />);
    expect(screen.getByTestId('modal-window')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-overlay'));

    //await waitFor(() => screen.getByTestId('modal-window'));
    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
  });
});
