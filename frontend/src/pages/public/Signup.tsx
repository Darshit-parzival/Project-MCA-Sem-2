import { Link } from "react-router-dom";
import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import Img from "../includes/assets/img/Register.jpg";
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [sucmessage, setSucMessage] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      try {
        if(password===cpassword){
          console.log({name,email,password})
          const response = await axios.post('http://127.0.0.1:8000/fans/add/', { name, email, password });
          if (response.data.success) {
              setSucMessage('Fan added successfully');
          } else {
              setMessage(response.data.message);
              console.log(response.data);
              
          }
        }else{
          setMessage("Password not same");
        }
      } catch (error) {
          setMessage('Error adding fan'); 
      }
  };
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Sign Up</p>
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
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Enroll for Laughs
                      </p>
                      {sucmessage && <p className="text-center h3 fw-bold txt-color-success">
                        {sucmessage}
                      </p>}
                      {message && <p className="text-center h3 fw-bold txt-color">
                        {message}
                      </p>}

                      <form className="mx-1 mx-md-4" method="post" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              id="form3Example1c"
                              value={name}
                              onChange={(e)=>setName(e.target.value)}
                              className="form-control"
                              />
                            <label className="form-label">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                            >
                            <input
                              type="email"
                              id="form3Example3c"
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                              className="form-control"
                              />
                            <label className="form-label">Your Email</label>
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
                              onChange={(e)=>setPassword(e.target.value)}
                              className="form-control"
                              />
                            <label className="form-label">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                            >
                            <input
                              type="password"
                              id="form3Example4cd"
                              value={cpassword}
                              onChange={(e)=>setCPassword(e.target.value)}
                              className="form-control"
                              />
                            <label className="form-label">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-left mx-4 mb-2">
                          <button
                            type="submit"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-lg"
                            style={{marginLeft:"-9px"}}
                            >
                            Register
                          </button>
                        </div>
                        <Link to="/login" className="h6 ms-3 txt-color mb-4">
                          Are you a member?
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

export default Signup;
