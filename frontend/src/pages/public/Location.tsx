import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import "../includes/assets/css/location.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Location = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [locationData, setLocationData] = useState([]);
  const fetchData = async () => {
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
  }, []);
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
              <label className="me-2" htmlFor="rowsPerPage">
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              >
                <option value={3}>3</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <div className="container d-flex justify-content-center">
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">City</th>
                      <th scope="col">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationData
                      .slice(0, rowsPerPage)
                      .map((location, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{location.city}</td>
                          <td>{location.address}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
