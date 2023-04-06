import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMoviesProps } from '../../types/types';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=e186f8253c4dd6e459f37348242bb754';
const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=e186f8253c4dd6e459f37348242bb754&query';

export default function SearchBar(props: IMoviesProps) {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  const [valueInput, setValueInput] = useState('');
  const [movies, setMovies] = useState([]);
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
        setMovies(data.results);
      });
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const url = `${API_SEARCH}=${valueInput}`;
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
      props.updateMovies(movies);
    } catch (event) {
      console.log(event);
    }
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
          aria-label="Search field"
          placeholder="Search Movies"
          type="search"
          value={valueInput}
          onChange={handleChange}
        />
      </form>
    </>
  );
}
