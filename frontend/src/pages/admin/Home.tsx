import logo from "../includes/assets/img/logo.png";
import "../includes/assets/css/adminDashboard.css";
import { FaCalendar, FaHome } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import Shows from "./Shows";
import Admins from "./Admins";
import Dashboard from "./Dashboard";

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showShows, setShowShows] = useState(false);
  const [admins, setAdmins] = useState(false);

  const admin = sessionStorage.getItem("admin");

  const logout = () => {
    sessionStorage.removeItem("admin");
    window.location.href = "/admin";
  };

  const handleClick = () => {
    setShowDashboard(true);
    document.getElementById("dashboard").classList.add("txt-color");
    document.getElementById("shows").classList.remove("txt-color");
    setShowShows(false);
    setAdmins(false);
  };
  const handleShows = () => {
    setShowShows(true);
    document.getElementById("shows").classList.add("txt-color");
    document.getElementById("dashboard").classList.remove("txt-color");
    setShowDashboard(false);
    setAdmins(false);
  };
  const handleAdmins = () => {
    setShowDashboard(false);
    setShowShows(false);
    setAdmins(true);
  };

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
          onClick={handleClick}
          to="/admin/home"
        >
          <img src={logo} width="40" height="40" alt="logo" className="me-2" />
          Comedy Club
        </Link>
        <span className=" w-100">Ahoy, {admin}!</span>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" onClick={logout}>
              Sign out
            </a>
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
                    className="nav-link text-white"
                    aria-current="page"
                    id="dashboard"
                    onClick={handleClick}
                  >
                    <FaHome className="me-1 mb-1" />
                    Dashboard
                  </label>
                </li>
                <li className="nav-item">
                  <label className="nav-link text-white" id="shows" onClick={handleShows}>
                    <FaCalendar className="me-1 mb-1" />
                    Shows
                  </label>
                </li>
                <li className="nav-item">
                  <label className="nav-link text-white" onClick={handleAdmins}>
                    Admin
                  </label>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="users"></span>
                    Comedians
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="bar-chart-2"></span>
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="layers"></span>
                    Contact us
                  </a>
                </li>
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Live Streaming</span>
                <a
                  className="link-secondary"
                  href="#"
                  aria-label="Add a new report"
                ></a>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Set up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="file-text"></span>
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="file-text"></span>
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="file-text"></span>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {showDashboard && <Dashboard />}
            {admins && <Admins />}
            {showShows && <Shows />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
