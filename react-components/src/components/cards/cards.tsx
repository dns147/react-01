import { ICardMoviesProps, IMovie } from '../../types/types';
import Card from './card';

export default function Cards(props: ICardMoviesProps) {
  return (
    <>
      <div className="cards" data-testid="card-list">
        {props.cardsMovies.map((card: IMovie) => (
          <Card key={card.id} cardItem={card} updateLoader={props.updateLoader} />
        ))}
      </div>
    </>
  );
}
