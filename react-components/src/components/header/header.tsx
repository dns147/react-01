import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [currentLocation, setCurrentLocation] = useState('home');

  const handleClick = (): void => {
    const currentPathname: string = window.location.pathname.slice(1);
    setCurrentLocation(currentPathname);
  };

  return (
    <>
      <nav id="nav-menu" onClick={handleClick}>
        <NavLink className={'nav-home-page'} to="/home">
          Home
        </NavLink>
        <NavLink className={'nav-forms-page'} to="/forms">
          Forms
        </NavLink>
        <NavLink className={'nav-about-page'} to="/about">
          About Us
        </NavLink>
        <b className={'current-page'}>{currentLocation + ' page'}</b>
      </nav>
    </>
  );
}
