import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/location.css";

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
              className=" description-box p-4 mt-5 mb-5"
              style={{ backgroundColor: "rgb(17,17,17)", marginTop: "10px" }}
            >
              <div className="container d-flex justify-content-center">
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Junagadh</p>
                  <div className="mt-3 locdes">
                    Size Zero Cafe, Junagadh.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <button type="submit" className="btn-card">
                      More Info
                    </button>
                  </div>
                </div>
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Rajkot</p>
                  <div className="mt-3 locdes">
                    Dira's Cafe, Rajkot.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <button type="submit" className="btn-card">
                      More Info
                    </button>
                  </div>
                </div>
                <div className="text-center col-sm-4">
                  <p className="h4 lochead">Ahmedabad</p>
                  <div className="mt-3 locdes">
                    Tea Post - Aarohi Galleria, Ahmedabad.
                    <p className="locdes mt-3">+91 84601 69509</p>
                    <button type="submit" className="btn-card">
                      More Info
                    </button>
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

export default Location;
