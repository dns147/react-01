import { ICardMoviesProps, IMovie } from '../../types/types';
import Card from './card';

export default function Cards(props: ICardMoviesProps) {
  console.log(props.cardsMovies);
  return (
    <>
      <div className="cards" data-testid="card-list">
        {props.cardsMovies.map((card: IMovie) => (
          <Card key={card.id} cardItem={card} />
        ))}
      </div>
    </>
  );
}
