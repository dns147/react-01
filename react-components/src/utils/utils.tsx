export const isCapital = (letter: string): boolean => !/^[^A-ZА-ЯЁ]*$/.test(letter);

export const defaultCheckedInputs = (inputs: HTMLInputElement[]): void => {
  inputs.forEach((radio: HTMLInputElement) => {
    if (radio.checked) {
      radio.checked = false;
    }
  });
};
