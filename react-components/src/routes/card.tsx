import { Component } from 'react';
import { ICards } from '../utils/types';

type MyProps = { item: ICards };
type MyState = {};

export default class Card extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="item">
          <h3>{this.props.item.title}</h3>
          <img src={this.props.item.images} alt="image" width="70" />
          <p>{this.props.item.description}</p>
          <b>Price: {this.props.item.price}</b>
          <br />
          <b>Stock: {this.props.item.stock}</b>
        </div>
      </>
    );
  }
}
