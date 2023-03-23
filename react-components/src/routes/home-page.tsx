import { Component } from 'react';
import Cards from '../components/cards/cards';
import cardsData from '../assets/json/data.json';
import { ICards } from '../types/types';
import SearchBar from '../components/search-bar/search-bar';

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
        <SearchBar value={this.state.value} />
        <Cards cards={this.state.cards} />
      </>
    );
  }
}
