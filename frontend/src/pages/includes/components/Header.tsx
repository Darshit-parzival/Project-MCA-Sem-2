import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "../assets/css/header.css";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <Link to="#">
              <img
                src={logo}
                style={{ width: "150px" }}
                className="rounded mx-auto d-block"
                alt="Thumbnail"
              />
            </Link>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  aria-current="page"
                  to="/calender"
                >
                  CALENDER
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  to="#"
                >
                  ABOUT
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  to="#"
                >
                  COMEDIANS
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  to="#"
                >
                  LOCATIONS
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  to="#"
                >
                  CONTACT
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active text-uppercase font-weight-bold"
                  to="#"
                >
                  FAQ
                </Link>
              </li>
              <li className="nav-item mx-3 dropdown">
                <Link
                  className="nav-link active dropdown-toggle text-uppercase font-weight-bold"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  MORE
                </Link>
                <ul
                  className="dropdown-menu bg-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      Login
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-light" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="respp">
        <div className="col-md-12 text-center">
          <Link to="/">
            <img
              src={logo}
              style={{ width: "125px" }}
              className="rounded mx-auto d-block"
              alt="Thumbnail"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
