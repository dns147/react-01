export const getValueCheck = (input: HTMLInputElement) => (input.checked ? input.value : '');

export const isCapital = (letter: string) => !/^[^A-ZА-ЯЁ]*$/.test(letter);
