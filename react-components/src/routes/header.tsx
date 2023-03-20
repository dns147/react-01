import { Component } from 'react';
import { NavLink } from 'react-router-dom';

type MyProps = {};
type MyState = { hash: string };

export default class Header extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      hash: '',
    };
  }

  updateHash(): string {
    this.setState({ hash: window.location.pathname.slice(1) });
    return this.state.hash;
  }

  render() {
    return (
      <>
        <nav id="nav-menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <b>{this.updateHash() + ' page'}</b>
        </nav>
      </>
    );
  }
}
