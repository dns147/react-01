import { useState } from 'react';
import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import { IMovie } from '../types/types';

export default function HomePage() {
  const [data, setData] = useState<IMovie[]>([]);

  const updateData = (value: IMovie[]): void => {
    setData(value);
  };

  return (
    <>
      <SearchBar updateMovies={updateData} />
      <Cards cardsMovies={data} />
    </>
  );
}
