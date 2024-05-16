import { useState, useEffect } from "react";
import axios from "axios";

const Admins = () => {
  const [adminData, setAdminData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/manager/data/"
        );
        if (response.data.success) {
          setAdminData(JSON.parse(response.data.data));
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (password === cpassword) {
        const response = await axios.post("http://127.0.0.1:8000/manager/add/", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setSucMessage(response.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setCPassword("");
  
          const updatedResponse = await axios.post("http://localhost:8000/manager/data/");
          if (updatedResponse.data.success) {
            setAdminData(JSON.parse(updatedResponse.data.data));
          }
        } else {
          setMessage(response.data.message);
        }
      } else {
        setMessage("Password not same");
      }
    } catch (error) {
      setMessage("Error adding fan");
    }
  };

  const unsetHandle = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setSucMessage("");
    setMessage("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Total Admin</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Admin
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
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {adminData.slice(0, rowsPerPage).map((admin, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
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
              {!sucmessage && !message && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Admin
                </h5>
              )}
              {sucmessage && !message && (
                <h5
                  className="modal-title txt-color-success"
                  id="exampleModalLabel"
                >
                  {sucmessage}
                </h5>
              )}
              {!sucmessage && message && (
                <h5 className="modal-title txt-color" id="exampleModalLabel">
                  {message}
                </h5>
              )}
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={unsetHandle}
              ></button>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    data-mdb-input-init
                    className="form-outline flex-fill mb-0"
                  >
                    <input
                      type="text"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Enter your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-label">Enter Name</label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    data-mdb-input-init
                    className="form-outline flex-fill mb-0"
                  >
                    <input
                      type="email"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    <label className="form-label">Enter Email</label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    data-mdb-input-init
                    className="form-outline flex-fill mb-0"
                  >
                    <input
                      type="password"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Create Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label">Create your password</label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div
                    data-mdb-input-init
                    className="form-outline flex-fill mb-0"
                  >
                    <input
                      type="password"
                      id="form3Example3c"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                    <label className="form-label">Confirm your password</label>
                  </div>
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
                <button type="submit" id="submit" className="btn btn-primary">
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
