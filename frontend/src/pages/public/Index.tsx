import { Link } from "react-router-dom";
import Img1 from "../includes/assets/img/Img1.jpg";
import "../includes/assets/css/Index.css";
import Header from "../includes/components/Header";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Footer from "../includes/components/Footer";

const Index = () => {
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
                  <div className="carousel-item active">
                    <div
                      className="card mb-3 bg-dark text-white"
                      style={{ height: "350px" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={Img1}
                            className="c-img img-fluid rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text mt-4">
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      <div className="card card-custom" style={{ width: '18rem' }}>
        <img src={Img1} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="card-body">
        <button type="submit" className="btn-card">Book SHow</button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Index;
