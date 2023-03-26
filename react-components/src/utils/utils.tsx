export const getValueCheck = (input: HTMLInputElement): string =>
  input.checked ? input.value : '';

export const isCapital = (letter: string): boolean => !/^[^A-ZА-ЯЁ]*$/.test(letter);
