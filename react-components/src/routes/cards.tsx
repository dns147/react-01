import { Component } from 'react';
import { ICards } from '../utils/types';
import Card from './card';

type MyProps = { cards: ICards[] };
type MyState = {};

export default class Cards extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="cards">
          {this.props.cards.map((card) => (
            <Card key={card.id} item={card} />
          ))}
        </div>
      </>
    );
  }
}
