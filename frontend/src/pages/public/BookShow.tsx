import { useEffect, useState } from "react";
import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import axios from "axios";

const BookShow = () => {
  const [book, setBook] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/book/data/");
      if (response.data.success) {
        setBook(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };
  const fetchShowData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/book/data/");
      if (response.data.success) {
        setBook(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };
  const fetchFanData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/book/data/");
      if (response.data.success) {
        setBook(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">Event Details</p>
      </div>
      <div className="container-fluid">
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box p-4 mb-5 mt-5"
              style={{ backgroundColor: "rgb(17,17,17)" }}
            >
              <div className="container">
                {book.map((book, index) => (
                  <div key={index}>Booked Show: {book.show}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookShow;
