import Header from "../includes/components/Header";
import "../includes/assets/css/Calender.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import Footer from "../includes/components/Footer";
import axios from "axios";

const Calender = () => {
  const [allShowsData, setAllShowsData] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBookShow = (show) => {
    sessionStorage.setItem('bookedShow', JSON.stringify(show));
    console.log('Show booked:', show);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/shows/data/");
        if (response.data.success) {
          setAllShowsData(response.data.data);
          setFilteredShows(response.data.data);
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterShows(date);
  };

  const filterShows = (date) => {
    const filtered = allShowsData.filter(show => {
      const showDate = new Date(show.date);
      return showDate.toDateString() === date.toDateString();
    });
    setFilteredShows(filtered);
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
                  new Date(new Date().setMonth(new Date().getFullYear() + 10))
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {filteredShows.map((show, index) => (
          <div
            key={index}
            className="card mb-3 bg-dark text-white"
            style={{ maxWidth: "500px", marginLeft: index !== 0 ? "15px" : "0" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`data:image/jpeg;base64, ${show.image_data}`} className="h-auto w-auto img-fluid rounded-start" alt={show.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{show.title}</h5>
                  <p className="card-text">{show.description}</p>
                  <button type="submit" className="btn-card"  onClick={() => handleBookShow(show)}>
                    Book Show
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Calender;
