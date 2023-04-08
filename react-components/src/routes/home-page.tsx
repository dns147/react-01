import { useState } from 'react';
import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import { IMovie } from '../types/types';
import ProgressBar from '../components/progress-bar/progress-bar';

export default function HomePage() {
  const [data, setData] = useState<IMovie[]>([]);
  const [vision, setVision] = useState(false);

  const updateData = (value: IMovie[], spinnerVisibility: boolean): void => {
    setData(value);
    setVision(spinnerVisibility);
  };

  return (
    <>
      <div className="search-container">
        <SearchBar updateMovies={updateData} />
        <ProgressBar spinnerVisibility={vision} />
      </div>

      <Cards cardsMovies={data} />
    </>
  );
}
