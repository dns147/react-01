import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMoviesProps } from '../../types/types';
import { fetchMovieList } from '../../utils/api.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectValue, setValue } from './searchSlice';

export default function SearchBar(props: IMoviesProps) {
  const valueFromLocalStorage = localStorage.getItem('inputValue') as string;
  //const [valueInput, setValueInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [isConnectToAPI, setIsConnectToAPI] = useState(true);
  const valueInputRef = useRef(valueFromLocalStorage ?? '');
  let valueInput = '';

  useEffect(() => {
    valueInput = useSelector(selectValue);
    //setValueInput(valueInputRef.current);
    return () => {
      localStorage.setItem('inputValue', valueInputRef.current);
    };
  }, []);

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem('inputValue') as string;

    const makeApiRequest = async () => {
      try {
        const dataPromise = await fetchMovieList(valueFromLocalStorage);
        setMovies(dataPromise.results);
      } catch (err) {
        setIsConnectToAPI(false);
        console.log(err);
      }
    };

    {
      valueFromLocalStorage && makeApiRequest();
    }
  }, []);

  useEffect(() => {
    props.updateMovies(movies);
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem('inputValue', valueInputRef.current);

    try {
      const dataPromise = await fetchMovieList(valueInput);
      setMovies(dataPromise.results);
    } catch (err) {
      setIsConnectToAPI(false);
      console.log(err);
    }
  };

  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentValue: string = event.target.value;
    dispatch(setValue(currentValue));
    //setValueInput(currentValue);
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
