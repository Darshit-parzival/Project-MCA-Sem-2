import Header from "../includes/components/Header";
import "../includes/assets/css/Calender.css";
import Calendar from "react-calendar";
import Img1 from "../includes/assets/img/Img1.jpg";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Footer from "../includes/components/Footer";

const Calender = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Header />
      <div className="style-0">
        <p className="style-1 fw-bolder">ALL SHOWS</p>
        <ul className="show-list">
          <li>
            <a href="" className="btn">
              ALL
            </a>
          </li>
          <li>
            <a href="" className="btn">
              junagadh
            </a>
          </li>
          <li>
            <a href="" className="btn">
              global
            </a>
          </li>
        </ul>
      </div>
      <div className="style-3"></div>
      <div className="style-10 bg-dark d-flex justify-content-center align-items-center">
        <h2 className="style-11 mr-3">
          <span className="style-12">Select Date:</span>
        </h2>
        <div
          style={{ marginLeft: "10px" }}
          className={`calendar-container ${isExpanded ? "expanded" : ""}`}
        >
          <div className="calendar-header" onClick={toggleCalendar}>
            <p style={{ marginBottom: "0" }}>{selectedDate.toDateString()}</p>
          </div>
          {isExpanded && (
            <div className="calendar-wrapper">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div
          className="card mb-3 bg-dark text-white"
          style={{ maxWidth: "540px" }}
        >
          <div className="row g-0" style={{ marginLeft: "-10px" }}>
            <div className="col-md-4">
              <img src={Img1} className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Title</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
                  repudiandae. Perspiciatis dolorum similique cupiditate
                  doloribus facere maxime ex libero quisquam, repellat
                  distinctio ad vero accusamus blanditiis, sunt minus cumque
                  illo.
                </p>
                <button type="submit" className="btn-card">
                    Book SHow
                  </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card mb-3 ms-3 bg-dark text-white"
          style={{ maxWidth: "540px" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img src={Img1} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Title</h5>
                <p className="card-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
                  nulla provident neque magni veniam, eveniet perferendis
                  praesentium labore iure officia ut odio vel quia, dolorum
                  architecto laboriosam dolor dicta fuga.
                </p>
                <button type="submit" className="btn-card">
                    Book SHow
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calender;
