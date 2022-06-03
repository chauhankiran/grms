import { Link, NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const { pathname } = useLocation();

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset"
  ) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GRMS
          </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GRMS
          </Link>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/companies" className="nav-link">
                Companies
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Nav;
