import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMoviesProps } from '../../types/types';

const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=e186f8253c4dd6e459f37348242bb754&query';

export default function SearchBar(props: IMoviesProps) {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  const [valueInput, setValueInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [vision, setVision] = useState(false);
  const valueInputRef = useRef(valueFromLocalStorage ?? '');

  useEffect(() => {
    setValueInput(valueInputRef.current);
    return () => {
      localStorage.setItem('inputValue', valueInputRef.current);
    };
  }, []);

  useEffect(() => {
    props.updateMovies(movies, vision);
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setVision(true);

    try {
      const url = `${API_SEARCH}=${valueInput}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setVision(false);
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
