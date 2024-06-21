import logo from "../includes/assets/img/logo.png";
import "../includes/assets/css/adminDashboard.css";
import { FaAmilia, FaCalendar, FaEnvelope, FaHome, FaPen, FaQuestion, FaUsers } from "react-icons/fa";
import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import Shows from "./Shows";
import Admins from "./Admins";
import Dashboard from "./Dashboard";
import Comedians from "./Comedians";
import { FaLocationPin, FaPeopleGroup, FaPerson } from "react-icons/fa6";
import Locations from "./Locations";
import AboutAdmin from "./AboutAdmin";
import Faq from "./Faq";
import Fans from "./Fans";
import Contact from "./Contact";

const Home = () => {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [showShows, setShowShows] = useState(false);
  const [admins, setAdmins] = useState(false);
  const [comedians, SetComedians] = useState(false);
  const [locations, SetLocations] = useState(false);
  const [about, SetAbout] = useState(false);
  const [faq, SetFaq] = useState(false);
  const [fans, SetFans] = useState(false);
  const [contact, SetContact] = useState(false);

  const admin = sessionStorage.getItem("admin");

  const logout = () => {
    sessionStorage.removeItem("admin");
    window.location.href = "/admin";
  };

  const handleNavClick = (navItem: SetStateAction<string>) => {
    setActiveNavItem(navItem);
    setShowShows(navItem === "shows");
    setAdmins(navItem === "admins");
    SetComedians(navItem === "comedians");
    SetLocations(navItem === "locations");
    SetAbout(navItem === "about");
    SetFaq(navItem === "faq");
    SetFans(navItem === "fans");
    SetContact(navItem === "contact");
  };

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          onClick={() => handleNavClick("dashboard")}
          to="/admin/home"
        >
          <img src={logo} width="40" height="40" alt="logo" className="me-2" />
          Comedy Club
        </Link>
        <span className=" w-100">Ahoy, {admin}!</span>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <label className="nav-link px-3" onClick={logout}>
              Sign out
            </label>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block sidebar collapse"
            style={{ background: "rgb(17, 17, 17" }}
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "dashboard" ? "active" : ""}`}
                    onClick={() => handleNavClick("dashboard")}
                  >
                    <FaHome className="me-1 mb-1" />
                    Dashboard
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "shows" ? "active" : ""}`}
                    onClick={() => handleNavClick("shows")}
                  >
                    <FaCalendar className="me-1 mb-1" />
                    Shows
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "admins" ? "active" : ""}`}
                    onClick={() => handleNavClick("admins")}
                  >
                    <FaPerson className="me-1 mb-1" />
                    Admin
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("comedians")}
                  >
                    <FaPeopleGroup className="me-1 mb-1" />
                    Comedians
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("locations")}
                  >
                    <FaLocationPin className="me-1 mb-1" />
                    Locations
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("about")}
                  >
                    <FaPen className="me-1 mb-1" />
                    About
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("faq")}
                  >
                    <FaQuestion className="me-1 mb-1" />
                    Frequently Asked Questions?
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("fans")}
                  >
                    <FaUsers className="me-1 mb-1" />
                    Fans
                  </label>
                </li>
                <li className="nav-item">
                  <label
                    className={`nav-link text-white ${activeNavItem === "comedians" ? "active" : ""}`}
                    onClick={() => handleNavClick("contact")}
                  >
                    <FaEnvelope className="me-1 mb-1" />
                    Contact
                  </label>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {activeNavItem === "dashboard" && <Dashboard />}
            {admins && <Admins />}
            {showShows && <Shows />}
            {comedians && <Comedians />}
            {locations && <Locations />}
            {about && <AboutAdmin />}
            {faq && <Faq />}
            {fans && <Fans />}
            {contact && <Contact />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
