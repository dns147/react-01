import { ChangeEvent, FormEvent, useState } from 'react';

export default function SearchBar() {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  const [valueInput, setValueInput] = useState(valueFromLocalStorage ?? '');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    localStorage.setItem('inputValue', valueInput);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentValue: string = event.target.value;
    setValueInput(currentValue);
    localStorage.setItem('inputValue', currentValue);
  };

  return (
    <>
      <form id="search-form" role="search" onSubmit={handleSubmit}>
        <button type="submit" data-testid="submit"></button>
        <input
          id="q"
          aria-label="Search field"
          placeholder="Search"
          type="search"
          name="q"
          value={valueInput}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
