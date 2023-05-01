import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Modal from './modal';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../app/store';

describe('test modal component', () => {
  const id = 1;
  const setOpen = () => {};

  test('close modal window', async () => {
    expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Modal setOpen={setOpen} idMovie={id} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal-window')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('close-overlay'));

    expect(screen.getByTestId('modal-window')).toBeInTheDocument();
  });
});
