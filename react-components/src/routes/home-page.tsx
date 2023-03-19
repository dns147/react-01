import { ChangeEvent, Component, FormEvent } from 'react';

type MyProps = {};
type MyState = { value: string };

export default class HomePage extends Component<MyProps, MyState> {
  constructor(props: string) {
    super(props);
    this.state = { value: localStorage.getItem('inputValue') ?? '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent): void {
    event.preventDefault();
    localStorage.setItem('inputValue', this.state.value);
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
      </>
    );
  }
}
