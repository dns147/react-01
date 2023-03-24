import { Component } from 'react';
import { ICards } from '../../types/types';

type MyProps = { item: ICards };
type MyState = {};

export default class Card extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    const { title, images, description, price, stock } = this.props.item;
    
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
}
