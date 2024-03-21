import { Link } from "react-router-dom";
import "../assets/css/footer.css";
import logo from "../assets/img/logo.png";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-100 foot p-5 ">
      <div className="container">
        <div className="d-flex">
          <div className="col-sm-4">
            <div>
              <Link to="/">
                <img src={logo} className="foot-img" />
              </Link>
            </div>
            <div>
              <Link to="/terms" className="terms">
                Terms & Conditions
              </Link>
            </div>
            <div>
              <Link to="/policy" className="terms">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="col-sm-4 d-flex">
            <div className="mt-4 col-sm-4 text-center">
              <div>
                <Link to="/" className="navfoot">
                  Home
                </Link>
              </div>
              <div>
                <Link to="/calender" className="navfoot">
                  Calender
                </Link>
              </div>
              <div>
                <Link to="/about" className="navfoot">
                  About
                </Link>
              </div>
              <div>
                <Link to="/comedians" className="navfoot">
                  Comedians
                </Link>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div>
                <Link to="/location" className="navfoot">
                  Location
                </Link>
              </div>
              <div>
                <Link to="/faq" className="navfoot">
                  FAQ
                </Link>
              </div>
              <div>
                <Link
                  className="navfoot dropdown-toggle font-weight-bold"
                  to=""
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-light" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="signup">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="vertical-line"></div>
          </div>
            <div className="mt-4 me-5">
              <p className="footloc">
                Junagadh
              </p>
              <div className="footloc mb-3">
              <FaMapLocation /> Urban Backyard Cafe,<br />
              Zanzarda Rd., Junagadh
              </div>
              <div className="footloc">
              <FaPhone /> <Link className="footloc" to="tel:+918460169509">+91 84601 69509</Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
