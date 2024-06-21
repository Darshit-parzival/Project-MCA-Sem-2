import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Header from "../includes/components/Header";
import Footer from "../includes/components/Footer";
import "../includes/assets/css/comedians.css";

const Comedians = () => {
  const [allComediansData, setAllComediansData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredComedians, setFilteredComedians] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/comedian/data/");
      if (response.data.success) {
        setAllComediansData(response.data.data);
        setFilteredComedians(response.data.data); // Display all comedians initially
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = search.trim().toLowerCase();

    if (searchTerm === "") {
      setFilteredComedians(allComediansData); // Reset to display all comedians
    } else {
      const filtered = allComediansData.filter(
        (comedian) =>
          comedian.name.toLowerCase().includes(searchTerm)
      );
      setFilteredComedians(filtered);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div
          className="text-center w-100 p-3"
          style={{ backgroundColor: "rgb(17,17,17)" }}
        >
          <p className="h1">COMEDIANS</p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box p-4 mb-5 mt-5"
              style={{ backgroundColor: "rgb(17,17,17)" }}
            >
              <div className="container">
                Search by Comedian
                <form className="d-flex" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Enter Comedian Name"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="card-body">
                    <button type="submit" className="btn-card">
                      <FaSearch className="me-1" />
                      Find Comedian
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-5 d-flex justify-content-center">
                {filteredComedians.length === 0 && search !== "" ? (
                  <p>No comedians found.</p>
                ) : (
                  filteredComedians.map((comedian, index) => (
                    <div
                      key={index}
                      className={`card mb-3 bg-dark text-white ${
                        index !== 0 ? "ms-3" : ""
                      }`}
                      style={{ maxWidth: "540px" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={`data:image/jpeg;base64, ${comedian.image_data}`}
                            className="img-fluid rounded-start w-auto h-auto"
                            alt={comedian.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{comedian.name}</h5>
                            <p className="card-text">{comedian.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comedians;
