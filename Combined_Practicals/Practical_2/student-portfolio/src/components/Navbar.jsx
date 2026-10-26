import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="site-nav">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}

export default Navbar;