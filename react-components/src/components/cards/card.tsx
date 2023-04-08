import { ICardProps } from '../../types/types';

const API_IMG = 'https://image.tmdb.org/t/p/w300';

export default function Card(props: ICardProps) {
  const { title, poster_path, release_date } = props.cardItem;
  const year: string = release_date.split('-')[0];

  return (
    <>
      <div className="item">
        <h3>
          {title} ({year})
        </h3>
        <img src={API_IMG + poster_path} alt="image" width="250" />
        {/* <p>{overview}</p> */}
        {/* <b>Price: {price}</b>
        <br />
        <b>Stock: {stock}</b> */}
      </div>
    </>
  );
}
