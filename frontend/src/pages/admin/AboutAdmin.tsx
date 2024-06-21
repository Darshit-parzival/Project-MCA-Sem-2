import axios from "axios";
import React, { useEffect, useState } from "react";

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState("");
  const [ytLink, setYtLink] = useState("");
  const [about, setAbout] = useState("");
  const [link, setLink] = useState("");
  const [sucMessage, setSucMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/about/data/");
      if (response.data.success) {
        setAboutData(response.data.about);
        setYtLink(response.data.about_yt);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/about/update/", {
        about,
        ytLink: link,
      });
      if (response.data.success) {
        setSucMessage(response.data.message);
        fetchData();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Error updating about");
    }
  };

  const handleReset = () => {
    setAbout("");
    setLink("");
    setSucMessage("");
    setErrorMessage("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Edit About</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Update About
        </button>
      </div>

      <div>
        <div>
          {aboutData.split(".").map((sentence, index) => (
            <p key={index}>{sentence.trim()}</p>
          ))}
        </div>
        {ytLink && (
          <p>
            <strong>YouTube Link:</strong>{" "}
            <a href={ytLink} target="_blank" rel="noopener noreferrer">
              {ytLink}
            </a>
          </p>
        )}
      </div>

      <div
        className="modal fade text-white"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              {!sucMessage && !errorMessage && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit About
                </h5>
              )}
              {sucMessage && (
                <h5
                  className="modal-title txt-color-success"
                  id="exampleModalLabel"
                >
                  {sucMessage}
                </h5>
              )}
              {errorMessage && (
                <h5 className="modal-title txt-color" id="exampleModalLabel">
                  {errorMessage}
                </h5>
              )}
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleReset}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control mb-3"
                placeholder="Enter Description"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              ></textarea>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter YouTube Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleReset}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update About
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;
