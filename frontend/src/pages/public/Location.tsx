import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/location.css";
import { Link } from "react-router-dom";

const Location = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">LOCATION</p>
      </div>
      <div className="container-fluid">
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box p-4 mt-5 mb-5"
              style={{ backgroundColor: "rgb(17,17,17)", marginTop: "10px" }}
            >
              <div className="container d-flex justify-content-center">
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Junagadh</p>
                  <div className="mt-3 locdes">
                    Size Zero Cafe, Junagadh.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <Link to="junagadh">
                      <button className="btn-card">More Info</button>
                    </Link>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.0003357512223!2d70.44283789678954!3d21.50770680000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395801a47baca4c3%3A0xf57e670a326ccf1f!2sSize%20Zero!5e0!3m2!1sen!2sin!4v1711050837150!5m2!1sen!2sin"
                    className="mt-5"
                    width="350"
                    height="350"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Rajkot</p>
                  <div className="mt-3 locdes">
                    Dira's Cafe, Rajkot.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <Link to="rajkot">
                    <button type="submit" className="btn-card">
                      More Info
                    </button>
                    </Link>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.644501698313!2d70.71220678128138!3d22.253563127430205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb5a50eb9843%3A0xa77376a844d14822!2sDira&#39;s%20Cafe!5e0!3m2!1sen!2sin!4v1711050952965!5m2!1sen!2sin"
                    width="350"
                    height="350"
                    className="mt-5"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Ahmedabad</p>
                  <div className="mt-3 locdes">
                    Tea Post - Aarohi Galleria, Ahmedabad.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <Link to="ahmedabad">
                    <button type="submit" className="btn-card">
                      More Info
                    </button>
                    </Link>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6175.789785445999!2d72.46505330365817!3d23.018389760799284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bf7f5d0e4df%3A0xeddf0987a343740c!2sTea%20Post%20-%20Aarohi%20Galleria%2C%20Best%20Hangout%20space%20in%20South%20Bopal!5e0!3m2!1sen!2sin!4v1711051102298!5m2!1sen!2sin"
                    width="350"
                    height="350"
                    className="mt-5"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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

export default Location;
