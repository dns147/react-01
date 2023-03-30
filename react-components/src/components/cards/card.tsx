import { ICardProps } from '../../types/types';

export default function Card(props: ICardProps) {
  const { title, images, description, price, stock } = props.cardItem;

  return (
    <>
      <div className="item">
        <h3>{title}</h3>
        <img src={images} alt="image" width="70" />
        <p>{description}</p>
        <b>Price: {price}</b>
        <br />
        <b>Stock: {stock}</b>
      </div>
    </>
  );
}
