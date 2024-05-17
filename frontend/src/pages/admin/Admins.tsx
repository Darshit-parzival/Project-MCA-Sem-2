import { useState, useEffect } from "react";
import axios from "axios";

const Admins = () => {
  const [adminData,setAdminData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/data/");
      if (response.data.success) {
        const adminDataWithIds = response.data.data.map((item: { _id: any; }) => ({
          ...item,
          id: item._id
        }));
        setAdminData(adminDataWithIds);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

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
          fetchData();
          setName("");
          setEmail("");
          setPassword("");
          setCPassword("");
        } else {
          setMessage(response.data.message);
        }
        console.log(adminData.id);
        
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

  const modalTitle = sucmessage
    ? { className: "txt-color-success", text: sucmessage }
    : message
    ? { className: "txt-color", text: message }
    : { className: "", text: "Add Admin" };

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
            <th scope="col">Delete</th>
            <th scope="col">Update Password</th>
          </tr>
        </thead>
        <tbody>
          {adminData.slice(0, rowsPerPage).map((admin, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td><button className="text-color">Delete</button></td>
              <td><button className="text-color">Update Password</button></td>
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
              <h5 className={`modal-title ${modalTitle.className}`} id="exampleModalLabel">
                {modalTitle.text}
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={unsetHandle}
              ></button>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <input
                type="text"
                id="form3Example3cName"
                className="form-control"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form-label">Enter Name</label>
              <input
                type="email"
                id="form3Example3cEmail"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <label className="form-label">Enter Email</label>
              <input
                type="password"
                id="form3Example3cPassword"
                className="form-control"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Create your password</label>
              <input
                type="password"
                id="form3Example3cCPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <label className="form-label">Confirm your password</label>
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
