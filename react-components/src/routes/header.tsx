import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav id="nav-menu">
        <NavLink className={'nav-home-page'} to="/home">
          Home
        </NavLink>
        <NavLink className={'nav-about-page'} to="/about">
          About Us
        </NavLink>
        <b className={'current-home-page'}>{'home page'}</b>
        <b className={'current-about-page'}>{'about page'}</b>
      </nav>
    </>
  );
}
