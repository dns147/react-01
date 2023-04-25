import { IMovie } from '../../types/types';
import Card from './card';
import { useAppSelector } from '../../utils/hooks';

export default function Cards() {
  const movies = useAppSelector((state) => state.movies.list);

  return (
    <>
      {movies.length > 0 ? (
        <div className="cards" data-testid="card-list">
          {movies.map((card: IMovie, index: number) => (
            <Card key={card.id} id={index} cardItem={card} />
          ))}
        </div>
      ) : (
        <h2>No Movies Found!</h2>
      )}
    </>
  );
}
