import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const currentPathname: string = useLocation().pathname.slice(1);

  return (
    <>
      <nav id="nav-menu">
        <NavLink className={'nav-home-page'} to="/home">
          Home
        </NavLink>
        <NavLink className={'nav-forms-page'} to="/forms">
          Forms
        </NavLink>
        <NavLink className={'nav-about-page'} to="/about">
          About Us
        </NavLink>
        <b className={'current-page'}>{currentPathname + ' page'}</b>
      </nav>
    </>
  );
}
