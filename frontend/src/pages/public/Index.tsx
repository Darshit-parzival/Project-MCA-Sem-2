import { Link } from "react-router-dom";
import Img1 from "../includes/assets/img/Img1.jpg";
import "../includes/assets/css/Index.css";
import Header from "../includes/components/Header";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Footer from "../includes/components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const [showsData, setShowsData] = useState([]);

  useEffect(() => {
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

    fetchData();
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
                      localStorage.getItem("carousel") === show.title && (
                        <div
                          className={`carousel-item ${
                            index !== -1 ? "active" : ""
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
      <div className="d-flex justify-content-center">
        {showsData.map((card, index) => (
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
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Index;
