import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav id="nav-menu">
      <NavLink to="/home">
        Home
      </NavLink>
      <NavLink to="/about">
        About Us
      </NavLink>
    </nav>
  );
}
