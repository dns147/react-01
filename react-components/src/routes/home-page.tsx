import { useState } from 'react';
import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import { IMovie } from '../types/types';
import ProgressBar from '../components/progress-bar/progress-bar';

export default function HomePage() {
  const [data, setData] = useState<IMovie[]>([]);
  const [visionLoader, setVisionLoader] = useState(false);

  const updateData = (value: IMovie[]): void => {
    setData(value);
  };

  const updateStateLoader = (state: boolean): void => {
    setVisionLoader(state);
  };

  return (
    <>
      <div className="search-container">
        <SearchBar updateMovies={updateData} />
        <ProgressBar spinnerVisibility={visionLoader} />
      </div>

      <Cards cardsMovies={data} updateLoader={updateStateLoader} />
    </>
  );
}
