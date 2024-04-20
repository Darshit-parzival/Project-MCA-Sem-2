import { Link } from "react-router-dom";
import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Login</p>
      </div>
      <div className="bg container mt-2 mb-2">
        <div className="row justify-content-center">
          <div className="col-md-4 login-container">
            <div className="text-white">
              <div className="card-body">
                <form>
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="username" className="mb-2 mt-2 h3">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="mb-2 mt-2 h3">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                  </div>
                  <button type="submit" className="btn-card mb-2 mt-4">
                    Submit
                  </button>
                </form>
              <Link to="/signup" className="txt-color h5">Create a new account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
