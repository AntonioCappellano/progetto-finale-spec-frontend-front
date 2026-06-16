import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
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
