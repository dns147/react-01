import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import Forms from '../routes/forms';
import userEvent from '@testing-library/user-event';

describe('test form component', () => {
  let inputName: HTMLInputElement;
  let inputSurname: HTMLInputElement;
  let inputDate: HTMLInputElement;
  let selectPlanet: HTMLSelectElement;
  let inputAccess: HTMLInputElement;
  let inputTypeCrew: HTMLInputElement;
  let inputFile: HTMLInputElement;
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });

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

  test('checking the saving of data from the form', async () => {
    render(<Forms />);

    inputName = screen.getByTestId('user-name');
    inputSurname = screen.getByTestId('user-surname');
    inputDate = screen.getByTestId('user-date');
    selectPlanet = screen.getByTestId('user-planet');
    inputAccess = screen.getByTestId('user-access');
    inputTypeCrew = screen.getByTestId('user-typeCrew');
    inputFile = screen.getByTestId('user-file');

    await userEvent.type(inputName, 'Rocky');
    await userEvent.type(inputSurname, 'Slay');
    await userEvent.type(inputDate, '2023-03-24');

    fireEvent.change(selectPlanet, { target: { value: 'mars' } });
    const options = screen.getAllByTestId('select-option') as HTMLOptionElement[];
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
    expect(options[4].selected).toBeFalsy();

    await userEvent.type(inputAccess, 'control');
    inputTypeCrew.checked = true;
    userEvent.upload(inputFile, file);

    await userEvent.click(screen.getByText('Send'));
    expect(screen.getByText('Data Successfully Saved')).toBeInTheDocument();
  });
});
