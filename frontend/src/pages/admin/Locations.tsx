import axios from "axios";
import { useState, useEffect } from "react";

const Locations = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/location/data/"
        );
        if (response.data.success) {
          setLocationData(JSON.parse(response.data.data));
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchData();
  }, []);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          "http://127.0.0.1:8000/location/add/",
          {
            city,
            address,
          }
        );
        if (response.data.success) {
          setCity("");
          setAddress("");

          const updatedResponse = await axios.post(
            "http://localhost:8000/location/data/"
          );
          if (updatedResponse.data.success) {
            setLocationData(JSON.parse(updatedResponse.data.data));
          }
        }
    } catch (error) {
      console.log("Error adding fan");
    }
  };

  const unsetHandle = () => {
    setCity("");
    setAddress("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Locations</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Location
        </button>
      </div>
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
      <table className="table text-white">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {locationData.slice(0, rowsPerPage).map((location, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{location.city}</td>
              <td>{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade text-white"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Location</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                onClick={unsetHandle}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={unsetHandle}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">Add Location</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
