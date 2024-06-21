import { Link } from "react-router-dom";
import "../includes/assets/css/Index.css";
import Header from "../includes/components/Header";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Footer from "../includes/components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const [showsData, setShowsData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [currentCity, setCurrentCity] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/shows/data/");
      if (response.data.success) {
        setShowsData(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  const fetchLocationData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/location/data/");
      if (response.data.success) {
        setLocationData(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLocationData();
  }, []);
  return (
    <>
      <div className="bg" style={{ height: "550px" }}>
        {<Header />}
        <div className="container-fluid overflow-x-hidden">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {showsData.map(
                    (show, index) =>
                      show.main_pg && (
                        <div
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                          key={index}
                        >
                          <div
                            className="card mb-3 bg-dark text-white"
                            style={{ height: "350px" }}
                          >
                            <div className="row g-0">
                              <div className="col-md-4">
                                <img
                                  src={`data:image/jpeg;base64, ${show.image_data}`}
                                  className="c-img rounded-start"
                                  alt={show.title}
                                />
                              </div>
                              <div className="col-md-8">
                                <div className="card-body">
                                  <h5 className="card-title">{show.title}</h5>
                                  <p className="card-text mt-4">
                                    {show.description}
                                  </p>
                                  <p className="card-text">
                                    <small className="text-muted">
                                      Date: {show.date}, Time: {show.time}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                ></button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ctn">
        For more information, call us:
        <span className="contact-info">
          <Link to="tel:+918460169509">+91 84601 69509</Link>
        </span>
        <div className="social-links">
          <ul>
            <li>
              <Link
                aria-label="Facebook Page"
                to="https://www.facebook.com/merakicomedyclub"
                target="fb_page"
              >
                <i>
                  <FaFacebook />
                </i>
              </Link>
            </li>
            <li>
              <Link
                aria-label="Twitter Page"
                to="https://www.youtube.com/@merakicomedyclub"
                target="twitter_page"
              >
                <i>
                  <FaYoutube />
                </i>
              </Link>
            </li>
            <li>
              <Link
                aria-label="Instagram Page"
                to="https://www.instagram.com/merakicomedyclub"
                target="insta_page"
              >
                <i>
                  <FaInstagram />
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <p className="title">Upcoming Shows</p>
        <div className="flex-container">
          {locationData.map((location, index) => (
            <button
              key={index}
              onClick={() => setCurrentCity(location.city)}
              className="btn me-2"
            >
              {location.city}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        {showsData.map((card, index) => {
          if (currentCity === "" || card.city === currentCity) {
            return (
              <div
                className="card card-custom"
                style={{ width: "18rem" }}
                key={index}
              >
                <img
                  src={`data:image/jpeg;base64, ${card.image_data}`}
                  className="card-img-top"
                  alt={card.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                </div>
                <div className="card-body">
                  <button type="submit" className="btn-card">
                    Book Show
                  </button>
                </div>
              </div>
            );
          } else {
            return null; // Render nothing if the show's city doesn't match currentCity
          }
        })}
      </div>
      <Footer />
    </>
  );
};

export default Index;
