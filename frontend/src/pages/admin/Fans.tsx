import axios from "axios";
import { useEffect, useState } from "react";

const Fans = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [fansData, setFansData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/fans/data/");
      if (response.data.success) {
        setFansData(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteFans = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fans/delete/",
        { id: id }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting fans:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Fans</h4>
        
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
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {fansData.slice(0, rowsPerPage).map((fans, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{fans.name}</td>
              <td>{fans.email}</td>
              <td>
                <button className="text-color" onClick={() => handleDeleteFans(fans.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fans;
