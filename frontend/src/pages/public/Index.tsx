import { Link } from "react-router-dom";
import logo from "../includes/assets/img/logo.png";
import Img1 from "../includes/assets/img/Img1.jpg";
import "../includes/assets/css/Index.css";

const Index = () => {
  return (
    <>
      <div className="bg">
        <div className="row respp">
          <div className="col-md-12 text-center mb-3">
            <Link to="#">
              <img
                src={logo}
                style={{ width: "150px" }}
                className="rounded mx-auto d-block"
                alt="Thumbnail"
              />
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="card mb-3 bg-dark text-white">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={Img1}
                          className="c-img img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
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
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
