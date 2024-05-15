import { Link } from "react-router-dom";
import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import Img from "../includes/assets/img/Login.jpg";
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sucmessage, setSucMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
      e.preventDefault(); // Prevent default form submission behavior
      
      try {
          const response = await axios.post('http://localhost:8000/api/login', { email, password });
          if (response.data.success) {
              setSucMessage(response.data.message);
              setMessage(''); // Reset any previous error message
          } else {
              setMessage(response.data.message);
              setSucMessage(''); // Reset any previous success message
          }
      } catch (error) {
          console.error('Login failed:', error);
          setMessage('An error occurred while logging in.'); // Set generic error message
          setSucMessage(''); // Reset any previous success message
      }
  };
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Login</p>
      </div>
      <section className="mb-2 mt-2">
        <div className="container h-100">
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
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Step into the Comedy Club
                      </p>
                      {sucmessage && <p className="text-center h3 fw-bold txt-color-success">
                        {sucmessage}
                      </p>}
                      {message && <p className="text-center h3 fw-bold txt-color">
                        {message}
                      </p>}

                      <form className="mx-1 mx-md-4" method="post" onSubmit={handleLogin}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="form3Example3c"
                              className="form-control"
                            />
                            <label className="form-label">Enter Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="form3Example4c"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                            />
                            <label className="form-label">Password</label>
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
                            Login
                          </button>
                        </div>
                        <Link to="/signup" className="h6 ms-3 txt-color mb-4">
                          Create an account
                        </Link>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={Img}
                        className="me-3 img-fluid"
                        style={{ height: "500px" }}
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
