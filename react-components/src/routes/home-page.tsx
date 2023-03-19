import { Component } from 'react';
import Cards from './cards';
import cardsData from '../assets/json/data.json';
import { ICards } from '../utils/types';
import SearchBar from './search-bar';

type MyProps = {};
type MyState = {
  value: string;
  cards: ICards[];
};

export default class HomePage extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      value: localStorage.getItem('inputValue') ?? '',
      cards: cardsData,
    };
  }

  render() {
    return (
      <>
        <h1>Home Page</h1>
        <SearchBar value={this.state.value} />
        <Cards cards={this.state.cards} />
      </>
    );
  }
}
