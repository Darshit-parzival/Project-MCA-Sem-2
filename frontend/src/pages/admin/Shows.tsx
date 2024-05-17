import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleDown } from "react-icons/fa";
import axios from "axios";
import FormData from "form-data";

const Shows = () => {
  const [showsData, setShowsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/shows/data/");
        if (response.data.success) {
          setShowsData(response.data.data);
        }
      } catch (error) {
        console.error("Data fetching failed:", error);
      }
    };

    fetchData();
  }, []);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");

  const unsetHandle = () => {
    setTitle("");
    setDescription("");
    setDate("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("city", city);
      formData.append("time", time);
      formData.append("image", document.getElementById("imageUpload").files[0]);

      const response = await axios.post(
        "http://127.0.0.1:8000/shows/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSucMessage(response.data.message);
        unsetHandle();

        const fetchData = async () => {
          try {
            const response = await axios.post("http://localhost:8000/shows/data/");
            if (response.data.success) {
              setShowsData(response.data.data);
            }
          } catch (error) {
            console.error("Data fetching failed:", error);
          }
        };
    
        fetchData();
      } else {
        setMessage(response.data.message);
        unsetHandle();
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Error adding show");
      unsetHandle();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Shows</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Create Show
        </button>
      </div>
      <div className="row row-cols-2 g-3">
        {showsData.map((show, index) => (
          <div key={index} className="col">
            <div className="card bg-dark text-white">
              <img
                src={`data:image/jpeg;base64, ${show.image_data}`}
                className="card-img-top"
                style={{ objectFit: "contain" }}
                alt={`Show ${index + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">{show.title}</h5>
                <p className="card-text">{show.description}</p>
                <p>Date: {show.date}</p>
                <p>Time: {show.time}</p>
                <p>city: {show.city}</p>
                <Link
                  className="btn-card"
                  to=""
                  id={`navbarDropdown${index}`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                  <FaArrowCircleDown className="ms-2" />
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby={`navbarDropdown${index}`}
                >
                  <li>
                    <Link className="dropdown-item" to={`/update/${index}`}>
                      Update Show
                    </Link>
                  </li>
                  <hr className="dropdown-divider bg-light" />
                  <li>
                    <Link className="dropdown-item" to={`/delete/${index}`}>
                      Delete Show
                    </Link>
                  </li>
                  <li>
                    <label className="dropdown-item" onClick={() => localStorage.setItem("carousel", show.title)}>Add to Main Page</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
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
              {!sucmessage && !message && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Show
                </h5>
              )}
              {sucmessage && !message && (
                <h5
                  className="modal-title txt-color-success"
                  id="exampleModalLabel"
                >
                  {sucmessage}
                </h5>
              )}
              {!sucmessage && message && (
                <h5 className="modal-title txt-color" id="exampleModalLabel">
                  {message}
                </h5>
              )}
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={unsetHandle}
              ></button>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <div className="modal-body">
                <input
                  type="text"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label className="form-label">Enter Show Title</label>
                <textarea
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.toLowerCase())}
                  required
                ></textarea>
                <label className="form-label">Enter Description of Show</label>
                <input
                  type="date"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <label className="form-label">Enter Date of the show</label>
                <input
                  type="time"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
                <label className="form-label">Enter Time of show</label>
                <input
                  type="text"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <label className="form-label">
                  In which city show is hosted
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control"
                  accept="image/jpeg, image/jpg"
                  // onChange={(e)=>setImage(e.target.files[0])}
                  required
                />
                <label className="form-label">
                  Upload Poster of show (preferred square)
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={unsetHandle}
                >
                  Close
                </button>
                <button type="submit" id="submit" className="btn btn-primary">
                  Create Show
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shows;
