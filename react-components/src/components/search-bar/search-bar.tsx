import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMoviesProps } from '../../types/types';
import { fetchMovieList } from '../../utils/api.service';

export default function SearchBar(props: IMoviesProps) {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  const [valueInput, setValueInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [isConnectToAPI, setIsConnectToAPI] = useState(true);
  const valueInputRef = useRef(valueFromLocalStorage ?? '');

  useEffect(() => {
    setValueInput(valueInputRef.current);
    return () => {
      localStorage.setItem('inputValue', valueInputRef.current);
    };
  }, []);

  useEffect(() => {
    props.updateMovies(movies);
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const dataPromise = await fetchMovieList(valueInput);
      setMovies(dataPromise.results);
    } catch (err) {
      setIsConnectToAPI(false);
      console.log(err);
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
      {!isConnectToAPI && <h2 className="message-failed">Connect to API Failed!</h2>}
    </>
  );
}
