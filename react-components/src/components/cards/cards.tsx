import { ICardMoviesProps, ICards } from '../../types/types';
import cardsData from '../../assets/json/data.json';
import Card from './card';

export default function Cards(props: ICardMoviesProps) {
  console.log(props.cardsMovies);
  return (
    <>
      <div className="cards" data-testid="card-list">
        {cardsData.map((card: ICards) => (
          <Card key={card.id} cardItem={card} />
        ))}
      </div>
    </>
  );
}
