import axios from "axios";
import { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaUserCheck, FaUsers } from "react-icons/fa";

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
                <FaUser style={{ width: 45, height: 45 }} />
              </div>
              <div className="ms-2">
                <label className="text-muted me-1">Total Admins:</label>
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
                <FaUsers style={{ width: 70, height: 70 }} />
              </div>
              <div className="ms-2">
                <label className="text-muted me-1" >Total Fans:</label>
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
                <FaUserCheck style={{ width: 55, height: 55 }} />
              </div>
              <div className="ms-2">
                <label className="text-muted me-1">Total Comedians:</label>
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
                <FaEnvelope style={{ width: 55, height: 55 }} />
              </div>
              <div className="ms-2">
                <label className="text-muted me-1">Total Contact Us:</label>
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
