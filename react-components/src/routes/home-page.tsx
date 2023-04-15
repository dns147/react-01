import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import ProgressBar from '../components/progress-bar/progress-bar';

export default function HomePage() {
  return (
    <>
      <div className="search-container">
        <SearchBar />
        <ProgressBar nameApiRequest={'moviesList'} />
      </div>
      <Cards />
    </>
  );
}
