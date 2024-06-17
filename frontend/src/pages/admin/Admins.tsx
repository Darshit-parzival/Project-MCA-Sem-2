import { useState, useEffect } from "react";
import axios from "axios";

const Admins = () => {
  const [adminData, setAdminData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMsg, setOtpMsg] = useState(null);
  const [upassword, setUPassword] = useState("");
  const [ucpassword, setUCPassword] = useState("");
  const [showpass, setShowPass] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/data/");
      if (response.data.success) {
        setAdminData(response.data.data);
      } else {
        console.error("Data fetching failed:", response.data.message);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === cpassword) {
        const response = await axios.post(
          "http://127.0.0.1:8000/manager/add/",
          {
            name,
            email,
            password,
          }
        );
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
      } else {
        setMessage("Password not same");
      }
    } catch (error) {
      setMessage("Error adding Admin");
    }
  };

  const unsetHandle = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setSucMessage("");
    setMessage("");
    setUCPassword("")
    setUPassword("")
    setOtp("")
  };

  const HandleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/manager/delete/",
        { id: id }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async (id, email) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/manager/update/otp/",
      { id: id, email: email }
    );
    if (response.data.success) {
      console.log("OTP sent successfully");
      setOtpMsg("OTP sent successfully")
      } else {
        console.error("Failed to send OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const HandleUpdatePassword = async (e) => {
    e.preventDefault();
    if (ucpassword === upassword) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/manager/update/password/",
          { id: curentAdmin[0], otp: otp, password: upassword, email: curentAdmin[1] }
        );
        if (response.data.success) {
          console.log("Password updated successfully");
          // Optionally, you can close the modal or show a success message here
        } else {
          console.error("Failed to update password:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to update password:", error);
      }
    } else {
      setMessage("Password Not matched");
    }
  };
  const modalTitle = sucmessage
    ? { className: "txt-color-success", text: sucmessage }
    : message
    ? { className: "txt-color", text: message }
    : { className: "", text: "Add Admin" };
  const modalTitle2 = sucmessage
    ? { className: "txt-color-success", text: sucmessage }
    : message && otpMsg
    ? { className: "txt-color", text: message }
    : { className: otpMsg ? "txt-color-success" : "", text: otpMsg || "OTP is on the way..." };

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
              <td>
                <button
                  className="text-color"
                  onClick={() => HandleDelete(admin.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="text-color"
                  data-bs-toggle="modal"
                  data-bs-target="#otp"
                  onClick={() => {
                    // setCurrentAdmin([admin.id, admin.email]);
                    // console.log("Id "+admin.id);
                    sendOTP(admin.id, admin.email)
                  }}
                >
                  Update Password
                </button>
              </td>
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
              <h5
                className={`modal-title ${modalTitle.className}`}
                id="exampleModalLabel"
              >
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

      <div
        className="modal fade text-white"
        id="otp"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5
                className={`modal-title ${modalTitle2.className}`}
                id="exampleModalLabel"
              >
                {modalTitle2.text}
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={unsetHandle}
              ></button>
            </div>
            <form method="post" onSubmit={HandleUpdatePassword}>
              <input
                type="number"
                id="form3Example3cName"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label className="form-label">Enter OTP</label>
              <input
                type={showpass ? "text" : "password"}
                id="form3Example3cName"
                className="form-control"
                placeholder="Enter Password"
                value={upassword}
                onChange={(e) => setUPassword(e.target.value)}
              />
              <label className="form-label">Enter Your New Password</label>
              <input
                type={showpass ? "text" : "password"}
                id="form3Example3cName"
                className="form-control"
                placeholder="Enter Password Again"
                value={ucpassword}
                onChange={(e) => setUCPassword(e.target.value)}
              />
              <label className="form-label">Verify Your New Password</label>
              <div>
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  autoComplete="off"
                  checked={showpass}
                  onChange={() => setShowPass(prevState => !prevState)}
                />
                <label className="btn btn-outline-primary" htmlFor="btncheck1">
                  <span>Show Password</span>
                </label>
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
                  Verify OtP
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
