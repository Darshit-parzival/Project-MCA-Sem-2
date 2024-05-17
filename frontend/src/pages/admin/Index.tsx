import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../includes/assets/img/adminlogin.png"

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr]=useState("")

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/manager/login/", {
        email,
        password,
      });
      if (response.data.success) {
        console.log(response.data);
        sessionStorage.setItem("admin",response.data.name)
        window.location.href="/admin/home"
      }
      else{
        setErr(response.data.message)
      }
    } catch (error) {
      
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
                        Admin
                      </p>
                      {err && (
                        <p className="text-center h3 fw-bold txt-color">
                          {err}
                        </p>
                      )}
                      <form
                        className="mx-1 mx-md-4 "
                        method="post"
                        onSubmit={handleLogin}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div
                            data-mdb-input-init
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value.toLowerCase())}
                              id="form3Example3c"
                              className="form-control"
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
                          Short term Memory loss?(forgot password)
                        </Link>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                     <img
                        src={logo}
                        className="me-3 img-fluid"
                        style={{ height: "auto",width:"50%" }}
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
    </div>
  );
};

export default Index;
