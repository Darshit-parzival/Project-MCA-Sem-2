import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    total_admin: 0,
    total_fans: 0,
    total_comedians: 0,
    total_contacts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/count/");
        if (response.data.success) {
          setCounts(response.data.data);
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h4>Dashboard</h4>
      </div>
      <div className="row ">
        <div className="col-md-6 mb-4 ">
          <div
            className="card bg-dark "
            style={{ height: "100%", borderColor: "white" }}
          >
            <div className="card-body d-flex justify-content-center align-items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="55"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </div>
              <div className="ms-2">
                <label className="text-muted">Total Admins:</label>
                <label>{counts.total_admin}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card bg-dark"
            style={{ height: "5rem", borderColor: "white" }}
          >
            <div className="card-body d-flex justify-content-center align-items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="55"
                  fill="currentColor"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
              </div>
              <div className="ms-2">
                <label className="text-muted">Total Fans:</label>
                <label>{counts.total_fans}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card bg-dark"
            style={{ height: "5rem", borderColor: "white" }}
          >
            <div className="card-body d-flex justify-content-center align-items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="55"
                  fill="currentColor"
                  className="bi bi-person-arms-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                  <path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" />
                </svg>
              </div>
              <div className="ms-2">
                <label className="text-muted">Total Comedians:</label>
                <label>{counts.total_comedians}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="card bg-dark"
            style={{ height: "100%", borderColor: "white" }}
          >
            <div className="card-body d-flex justify-content-center align-items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="55"
                  fill="currentColor"
                  className="bi bi-envelope-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                </svg>
              </div>
              <div className="ms-2">
                <label className="text-muted">Total Contact Us:</label>
                <label>{counts.total_contacts}</label>
              </div>
            </div>
          </div>
        </div>
        <label>
          Show States
        </label>
      </div>
    </div>
  );
};

export default Dashboard;
