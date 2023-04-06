import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=e186f8253c4dd6e459f37348242bb754';

export default function SearchBar() {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  const [valueInput, setValueInput] = useState('');
  const valueInputRef = useRef(valueFromLocalStorage ?? '');

  useEffect(() => {
    setValueInput(valueInputRef.current);
    return () => {
      localStorage.setItem('inputValue', valueInputRef.current);
    };
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    localStorage.setItem('inputValue', valueInput);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentValue: string = event.target.value;
    setValueInput(currentValue);
    valueInputRef.current = currentValue;
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
