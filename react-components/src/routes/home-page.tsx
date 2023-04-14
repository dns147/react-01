import { useState } from 'react';
import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import ProgressBar from '../components/progress-bar/progress-bar';

export default function HomePage() {
  const [visionLoader, setVisionLoader] = useState(false);

  const updateStateLoader = (state: boolean): void => {
    setVisionLoader(state);
  };

  return (
    <>
      <div className="search-container">
        <SearchBar />
        <ProgressBar spinnerVisibility={visionLoader} />
      </div>

      <Cards updateLoader={updateStateLoader} />
    </>
  );
}
