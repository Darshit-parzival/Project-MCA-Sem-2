import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [id, setId] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [verifyOtp, setVerifyOtp] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [msg, setMsg] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showpass, setShowPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/fans/update/otp/",
        {
          email: email,
        }
      );
      if (response.data.success) {
        setOtpMsg(response.data.message);
        setVerifyOtp(response.data.otp);
        console.log(response.data.otp);
        setMsg(true);
        setId(response.data.id);
      } else {
        setId("");
        setMsg(false);
        setOtpMsg(response.data.message);
        console.error("Failed to send OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.toString() === verifyOtp.toString()) {
      setOtpVerified(true);
      setMsg(false)
    } else setOtpVerified(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
console.log(id);

    try {
      if (password === cpassword) {
        console.log("Updating password...");
        const response = await axios.post(
          "http://127.0.0.1:8000/fans/update/password/",
          {
            id: id,
            password: password,
          }
        );
        if (response.data.success) {
          setOtpMsg(response.data.message);
          setMsg(true);
        } else {
          setMsg(false);
          setOtpMsg(response.data.message);
          console.error("Failed to update password:", response.data.message);
        }
      } else {
        console.log("Invalid OTP or passwords do not match.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div>
      <section className="mb-2 mt-2">
        <div className="container h-100 position-absolute top-50 start-50 translate-middle">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black"
                style={{
                  borderRadius: "25px",
                  backgroundColor: "rgb(17,17,17)",
                }}
              >
                <div className="card-body p-md-5">
                  <div className="row justify-content-center w-auto">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Fan Password Updation
                      </p>

                      {!otpVerified &&
                        <p
                        className={
                          msg
                            ? "text-center h3 fw-bold txt-color-success"
                            : "text-center h3 fw-bold txt-color"
                        }
                      >
                        {otpMsg}
                      </p>}
                      {otpVerified &&
                        <p
                        className={
                             "text-center h3 fw-bold txt-color-success"
                        }
                      >
                        Change your Password
                      </p>}

                      {!otpVerified && !msg && (
                        <form
                          className="mx-1 mx-md-4"
                          method="post"
                          onSubmit={sendOTP}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0"
                            >
                              <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                  setEmail(e.target.value.toLowerCase())
                                }
                                id="form3Example3c"
                                className="form-control"
                              />
                              <label className="form-label">Enter Email</label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-left mx-4 mb-2">
                            <button
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-lg"
                              style={{ marginLeft: "-9px" }}
                            >
                              Send Otp
                            </button>
                          </div>
                          <Link to="/login" className="h6 ms-3 txt-color mb-4">
                            Back to door
                          </Link>
                        </form>
                      )}

                      {!otpVerified && msg && (
                        <form
                          className="mx-1 mx-md-4"
                          method="post"
                          onSubmit={handleVerifyOTP}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0"
                            >
                              <input
                                type="number"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                id="form3Example3c"
                                className="form-control"
                              />
                              <label className="form-label">Enter otp</label>
                            </div>
                          </div>
                          <div className="d-flex justify-content-left mx-4 mb-2">
                            <button
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-lg"
                              style={{ marginLeft: "-9px" }}
                            >
                              Verify OTP
                            </button>
                          </div>
                          <Link to="/admin" className="h6 ms-3 txt-color mb-4">
                            Back to door
                          </Link>
                        </form>
                      )}

                      {otpVerified && (
                        <form
                          className="mx-1 mx-md-4"
                          method="post"
                          onSubmit={handleUpdatePassword}
                        >
                          <div className="d-flex flex-row align-items-center mb-4">
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0"
                            >
                              <input
                                type={showpass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="form3Example3c"
                                className="form-control"
                              />
                              <label className="form-label">
                                Enter Password
                              </label>
                            </div>
                            <div
                              data-mdb-input-init
                              className="form-outline flex-fill mb-0"
                            >
                              <input
                                type={showpass ? "text" : "password"}
                                value={cpassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                id="form3Example3c"
                                className="form-control"
                              />
                              <label className="form-label">
                                Enter Confirm Password
                              </label>
                            </div>
                          </div>
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
                          <div className="d-flex justify-content-left mx-4 mb-2">
                            <button
                              type="submit"
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-lg"
                              style={{ marginLeft: "-9px" }}
                            >
                              Update Password
                            </button>
                          </div>
                          <Link to="/login" className="h6 ms-3 txt-color mb-4">
                            Back to door
                          </Link>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgot;
