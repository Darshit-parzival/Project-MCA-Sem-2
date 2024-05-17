import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../includes/components/Header";

const Profile = () => {
  const name = sessionStorage.getItem("name");
  const book=sessionStorage.getItem("bookedShow")
  const bookedShowFromSession = JSON.parse(book);
  const [bookedShowFromDb, setBookedShowFromDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedShow = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/booked-show"); 
        if (response.data.success) {
          setBookedShowFromDb(response.data.data);
        } else {
          setError("Failed to fetch booked show from database.");
        }
      } catch (err) {
        setError("An error occurred while fetching booked show from database.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedShow();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="text-center w-100 p-3" style={{ backgroundColor: "rgb(17,17,17)" }}>
        <p className="h1">Ahoy, {name}!</p>
      </div>
      <div className="d-flex justify-content-center">
        {bookedShowFromSession ? (
          <div className="card mb-3 bg-dark text-white" style={{ maxWidth: "500px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`data:image/jpeg;base64, ${bookedShowFromSession.image_data}`} className="h-auto w-auto img-fluid rounded-start" alt={bookedShowFromSession.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{bookedShowFromSession.title}</h5>
                  <p className="card-text">{bookedShowFromSession.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="h2">No shows booked in this session.</p>
        )}
      </div>
      <div className="d-flex justify-content-center">
        {bookedShowFromDb ? (
          <div className="card mb-3 bg-dark text-white" style={{ maxWidth: "500px" }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={`data:image/jpeg;base64, ${bookedShowFromDb.image_data}`} className="h-auto w-auto img-fluid rounded-start" alt={bookedShowFromDb.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{bookedShowFromDb.title}</h5>
                  <p className="card-text">{bookedShowFromDb.description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="h2">No shows booked in the database.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
