import { ChangeEvent, Component, FormEvent } from 'react';
import Cards from './cards';
import cardsData from '../assets/json/data.json';
import { ICards } from '../utils/types';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent): void {
    event.preventDefault();
    localStorage.setItem('inputValue', this.state.value);
    console.log(cardsData);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <>
        <h1>Home Page</h1>
        <form id="search-form" role="search" onSubmit={this.handleSubmit}>
          <button type="submit"></button>
          <input
            id="q"
            aria-label="Search field"
            placeholder="Search"
            type="search"
            name="q"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <Cards cards={this.state.cards} />
      </>
    );
  }
}
