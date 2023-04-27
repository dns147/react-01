import Cards from '../components/cards/cards';
import SearchBar from '../components/search-bar/search-bar';
import ProgressBar from '../components/progress-bar/progress-bar';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { fetchPopularMovies } from '../features/popularMoviesSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <>
      <div className="search-container">
        <SearchBar />
      </div>
      <Suspense fallback={<ProgressBar nameApiRequest={'moviesList'} />}>
        <Cards />
      </Suspense>
    </>
  );
}
