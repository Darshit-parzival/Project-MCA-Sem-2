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
  const [verifyOtp, setVerifyOtp] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [showpass, setShowPass] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  const handleAddAdmin = async (e) => {
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
          resetForm();
        } else {
          setMessage(response.data.message);
        }
      } else {
        setMessage("Passwords do not match.");
      }
    } catch (error) {
      setMessage("Error adding admin.");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/manager/delete/",
        {
          id: id,
        }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const sendOTP = async (id, email) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/manager/update/otp/",
        {
          id: id,
          email: email,
        }
      );
      if (response.data.success) {
        setOtpMsg(response.data.message);
        setVerifyOtp(response.data.otp);
        console.log(response.data.otp);
        setName(id);
      } else {
        console.error("Failed to send OTP:", response.data.message);
        setName("");
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (otpVerified && password === cpassword) {
        console.log("Updating password...");
        const response = await axios.post(
          "http://127.0.0.1:8000/manager/update/password/",
          {
            id: name,
            password: password
          }
        );
        if (response.data.success) {
          setOtpMsg(response.data.message);
          setName("");
        } else {
          console.error("Failed to update password:", response.data.message);
          setName("");
        }
        resetForm();
        setOtpVerified(false);
      } else {
        console.log("Invalid OTP or passwords do not match.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setSucMessage("");
    setMessage("");
    setOtp("");
  };

  const handleOTPVerification = (e) => {
    console.log(verifyOtp);
    console.log(otp);

    e.preventDefault();

    if (otp.toString() === verifyOtp.toString()) {
      setOtpVerified(true);
      setOtpMsg("Enter New password key! Don't lose it this time.");
      setMessage("");
    } else {
      setOtpVerified(false);
      console.log();
      setMessage(
        "Seems your magic code needs a little more magic. Poof! Try again."
      );
      setName("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
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
    : {
        className: otpMsg ? "txt-color-success" : "",
        text: otpMsg || "OTP is on the way...",
      };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Total Admins</h4>
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
                  onClick={() => handleDeleteAdmin(admin.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="text-color"
                  data-bs-toggle="modal"
                  data-bs-target="#otp"
                  onClick={() => sendOTP(admin.id, admin.email)}
                >
                  Update Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Admin Modal */}
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
                onClick={resetForm}
              ></button>
            </div>
            <form method="post" onSubmit={handleAddAdmin}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="form-label">Enter Name</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <label className="form-label">Enter Email</label>
              <input
                type={showpass ? "text" : "password"}
                className="form-control"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Create your password</label>
              <input
                type={showpass ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <label className="form-label">Confirm your password</label>
              <div>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                    checked={showpass}
                    onChange={togglePasswordVisibility}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    <span>Show Password</span>
                  </label>
                </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={resetForm}
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

      {/* OTP Modal */}
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
                {modalTitle2.text || message}
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>
            {otpMsg==="Round two for the admin password update. Yippee." && otpVerified || (
              <form method="post" onSubmit={handleOTPVerification}>
                <input
                  type="number"
                  id="form3Example3cName"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <label className="form-label">Enter OTP</label>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={resetForm}
                  >
                    Close
                  </button>
                  <button type="submit" id="submit" className="btn btn-primary">
                    Verify OTP
                  </button>
                </div>
              </form>
            )}

            {otpVerified && (
              <form method="post" onSubmit={handleUpdatePassword}>
                <input
                  type={showpass ? "text" : "password"}
                  id="form3Example3cName"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label">Enter New Password</label>
                <input
                  type={showpass ? "text" : "password"}
                  id="form3Example3cName"
                  className="form-control"
                  placeholder="Enter Password Again"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <label className="form-label">Verify New Password</label>
                <div>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                    checked={showpass}
                    onChange={togglePasswordVisibility}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    <span>Show Password</span>
                  </label>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={resetForm}
                  >
                    Close
                  </button>
                  <button type="submit" id="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
