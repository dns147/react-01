import { ChangeEvent, Component, FormEvent } from 'react';

type MyProps = { value: string };
type MyState = { value: string };

export default class SearchBar extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    localStorage.setItem('inputValue', this.state.value);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentValue: string = event.target.value;
    this.setState({ value: currentValue });
    localStorage.setItem('inputValue', currentValue);
  };

  render() {
    return (
      <>
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
