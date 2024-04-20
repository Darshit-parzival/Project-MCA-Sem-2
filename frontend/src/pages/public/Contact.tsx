import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/contact.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <div className="row ms-5 me-5" style={{width:"35%"}}>
            <div className="col p-5">
              <div className="text-left">
                <p className="h1">Contact Info</p>
                <p>
                  <FaPhone className="me-2" /> <Link className="txt-color" to="tel:+918460169509"> +91 84601 69509</Link>
                </p>
                <p>
                  <FaEnvelope className="me-2" /> <Link className="txt-color" to="mailto:darshitrakhasia@gmail.com">  merakicomedyclub@gmail.com </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row" style={{width:"35%"}}>
            <div className="col p-5">
              <h3 className="txt-color">Contact Form</h3>
              <label>For information about shows or any questions please use the contact form below, or call at <Link className="txt-color" to="tel:+918460169509">+91 84601 69509</Link> or email us at info@newyorkcomedyclub.com</label>
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
                <button type="submit" className="btn-card">
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
