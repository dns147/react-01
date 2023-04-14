import { ChangeEvent, FormEvent, useState } from 'react';
import { setValue } from '../../features/searchSlice';
import { fetchMovies } from '../../features/moviesSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export default function SearchBar() {
  const [isConnectToAPI, setIsConnectToAPI] = useState(true);
  const dispatch = useAppDispatch();
  const valueInput = useAppSelector((state) => state.search.value);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchMovies(valueInput));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentValue: string = event.target.value;
    dispatch(setValue(currentValue));
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
