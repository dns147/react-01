import { ChangeEvent, FormEvent, useState } from "react";

export default function HomePage() {
  const localDataValue = localStorage.getItem('inputValue');
  const [valueInput, setValueInput] = useState(localDataValue ?? '');
 
  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    localStorage.setItem('inputValue', valueInput);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setValueInput(event.target.value);
  }

  return (
    <>
      <h1>Home Page</h1>
      <form id="search-form" role="search" onSubmit={handleSubmit}>
        <button type="submit"></button>
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