import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/contact.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Contact Comedy Club</p>
      </div>
      <div className="brick">
        <div className="container-fluid d-flex justify-content-center">
          <div className="row ms-5 me-5">
            <div className="col p-5">
              <div className="text-left">
                <p className="h1">Contact Info</p>
                <p>
                  <FaPhone className="me-2" /> +91 84601 69509
                </p>
                <p>
                  <FaEnvelope className="me-2" /> merakicomedyclub@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col p-5">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
