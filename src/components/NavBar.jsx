import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="nav-link fs-5 fw-semibold text-secondary link-primary d-inline-flex align-items-center"
          >
            <i className="bi bi-joystick me-2"></i>
            BoolGames
          </Link>
          <div className="d-flex align-items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link fw-medium transition-all ${isActive ? "text-primary border-bottom border-primary border-2 pb-1" : "text-secondary"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `nav-link fw-medium transition-all ${isActive ? "text-primary border-bottom border-primary border-2 pb-1" : "text-secondary"}`
              }
            >
              Preferiti
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
