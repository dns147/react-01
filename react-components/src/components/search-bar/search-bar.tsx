import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMoviesProps } from '../../types/types';

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
    props.updateMovies(movies);
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const url = `${API_SEARCH}=${valueInput}`;
      const response = await fetch(url);
      const reader = response.body?.getReader() as ReadableStreamDefaultReader<Uint8Array>;
      const contentLength = Number(response.headers.get('Content-Length'));
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        console.log(`Получено ${receivedLength} из ${contentLength}`);
      }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;

      for (const chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const result = new TextDecoder('utf-8').decode(chunksAll);
      const commits = JSON.parse(result);
      setMovies(commits.results);
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
