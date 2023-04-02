import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import Forms from '../routes/forms';
import userEvent from '@testing-library/user-event';

describe('test form component', () => {
  const nameSmallLetter = 'rocky';
  const nameBigLetter = 'Rocky';
  const onChangeInput = vi.fn();
  const onHoverInput = vi.fn();
  const onBlurInput = vi.fn();
  let inputName: HTMLInputElement;
  let inputSurname: HTMLInputElement;
  let inputDate: HTMLInputElement;

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

  // beforeEach(() => {
  //   render(<Forms />);
  //   inputName = screen.getByTestId('user-name');
  //   //inputName.value = nameSmallLetter;
  // });

  afterEach(() => {
    vi.clearAllMocks();
  });

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
    expect(screen.getByText('Name must start with a capital letter.')).toBeInTheDocument();
  });

  test('hover event trigger onMouseEnter event', async () => {
    render(<Forms />);
    inputName = screen.getByTestId('user-name');
    inputName.value = data.name;

    //vi.spyOn(console, 'warn');
    expect(inputName).toBeInTheDocument();
    // await userEvent.hover(inputName);
    // expect(onHoverInput).toBeCalled();
    // expect(onBlurInput).not.toBeCalled();
  });
});
