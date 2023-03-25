import { Component } from 'react';
import { NavLink } from 'react-router-dom';

type MyProps = {};
type MyState = {
  location: string;
};

export default class Header extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);

    this.state = {
      location: location.pathname.slice(1),
    };
  }

  handleClick = (): void => {
    const currentPathname: string = location.pathname.slice(1);
    this.setState({ location: currentPathname });
  };

  render() {
    const { location } = this.state;
    const firstPage: string = location ? ' page' : 'home page';

    return (
      <>
        <nav id="nav-menu" onClick={this.handleClick}>
          <NavLink className={'nav-home-page'} to="/home">
            Home
          </NavLink>
          <NavLink className={'nav-forms-page'} to="/forms">
            Forms
          </NavLink>
          <NavLink className={'nav-about-page'} to="/about">
            About Us
          </NavLink>
          <b className={'current-page'}>{location + firstPage}</b>
        </nav>
      </>
    );
  }
}
