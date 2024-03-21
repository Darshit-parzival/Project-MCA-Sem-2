import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/comedians.css";
import { FaSearch } from "react-icons/fa";
import Img1 from "../includes/assets/img/Img1.jpg";

const Comedians = () => {
  return (
    <div>
      <Header />
      <div>
        <div
          className="text-center w-100 p-3"
          style={{ backgroundColor: "rgb(17,17,17)" }}
        >
          <p className="h1">COMEDIANS</p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box p-4 mb-5 mt-5"
              style={{ backgroundColor: "rgb(17,17,17)" }}
            >
              <div className="container">
                Search by Comedian
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Enter Comedian Name"
                    aria-label="Search"
                  />
                  <div className="card-body">
                    <button type="submit" className="btn-card">
                      <FaSearch className="me-1" />
                      Find Comedian
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-5 d-flex justify-content-center">
                <div
                  className="card mb-3 bg-dark text-white"
                  style={{ maxWidth: "540px" }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={Img1} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Title</h5>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ex, repudiandae. Perspiciatis dolorum similique
                          cupiditate doloribus facere maxime ex libero quisquam,
                          repellat distinctio ad vero accusamus blanditiis, sunt
                          minus cumque illo.
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
                      <img
                        src={Img1}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Title</h5>
                        <p className="card-text">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. At nulla provident neque magni veniam, eveniet
                          perferendis praesentium labore iure officia ut odio
                          vel quia, dolorum architecto laboriosam dolor dicta
                          fuga.
                        </p>
                        <button type="submit" className="btn-card">
                          Book SHow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comedians;
