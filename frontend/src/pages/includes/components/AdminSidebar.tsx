import logo from "../includes/assets/img/logo.png";
import "../includes/assets/css/adminDashboard.css";
import { FaCalendar, FaFile } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {

const admin = sessionStorage.getItem("admin");

const logout=()=>{
  sessionStorage.removeItem("admin")
  window.location.href='/admin'
}

  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
          <img src={logo} width="40" height="40" alt="logo" className="me-2" />
          comedy club
        </a>
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
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to='/admin/shows'
                  >
                    <FaCalendar className="me-1 mb-1" />
                    Dashbo
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <FaFile className="me-1 mb-1" />
                    Events
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span data-feather="shopping-cart"></span>
                    Users
                  </a>
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
        </div>
      </div>
    </div>
    
  );
};

export default AdminSidebar;
