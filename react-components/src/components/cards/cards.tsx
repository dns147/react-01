import { IMovie } from '../../types/types';
import Card from './card';
import { useAppSelector } from '../../utils/hooks';

export default function Cards() {
  const popularMovies = useAppSelector((state) => state.popularMovies.list);
  const movies = useAppSelector((state) => state.movies.list);
  const valueInput = useAppSelector((state) => state.search.value);

  const resultMovies = movies.length > 0 || valueInput !== '' ? movies : popularMovies;

  return (
    <>
      {resultMovies.length > 0 ? (
        <div className="cards" data-testid="card-list">
          {resultMovies.map((card: IMovie, index: number) => (
            <Card key={card.id} id={index} cardItem={card} />
          ))}
        </div>
      ) : (
        <h2>No Movies Found!</h2>
      )}
    </>
  );
}
