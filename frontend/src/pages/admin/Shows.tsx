import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleDown, FaCheckDouble } from "react-icons/fa";
import axios from "axios";
import FormData from "form-data";

const Shows = () => {
  const [showsData, setShowsData] = useState([]);
  const [isShowToUpdate, setIsShowToUpdate] = useState(false);

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

    const handleChange = () => {
      setMainPg(!mainpg);
    };

  const updateShow = (show) => {
    setIsShowToUpdate(true);
    setId(show.id);
    setTitle(show.title);
    setDescription(show.description);
    setDate(show.date);
    setTime(show.time);
    setCity(show.city);
    setMainPg(show.main_pg);
    setSucMessage("");
  };

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");
  const [mainpg, setMainPg] = useState(false);

  const unsetHandle = () => {
    setSucMessage("");
    setMessage("")
    setTitle("");
    setDescription("");
    setDate("");
    setTime("")
    setCity("")
    setMainPg(false)
  };

  const deleteShow = async (id: any) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/shows/delete/", {
        id,
      });

      if (response.data.success) {
        const updatedShows = showsData.filter((show) => show.id !== id);
        setShowsData(updatedShows);
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setId(showsData.id);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("city", city);
      formData.append("time", time);
      formData.append("main_pg", mainpg);
      formData.append("image", document.getElementById("imageUpload").files[0]);

      if (isShowToUpdate) {
        const response = await axios.post(
          "http://127.0.0.1:8000/shows/update/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          console.log(
            "update",
            document.getElementById("imageUpload").files[0]
          );
          setSucMessage(response.data.message);
          unsetHandle();

          const fetchData = async () => {
            try {
              const response = await axios.post(
                "http://localhost:8000/shows/data/"
              );
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
      } else {
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
              const response = await axios.post(
                "http://localhost:8000/shows/data/"
              );
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
          onClick={() => setIsShowToUpdate(false)}
          data-bs-target="#exampleModal"
        >
          Create Show
        </button>
      </div>
      <div className="row row-cols-2 g-3">
        {showsData.map((show, index) => (
          <div key={index} className="col w-auto">
            <div className="card bg-dark text-white" style={{width:"fit-content"}}>
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
                <p>Set on Main Page: {show.main_pg?"Added to Main Page":"Not Added to Main Page"}</p>
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
                    <button
                      className="dropdown-item"
                      data-bs-toggle="modal"
                      onClick={() => updateShow(show)}
                      data-bs-target="#exampleModal"
                    >
                      Update Show
                    </button>
                  </li>
                  <hr className="dropdown-divider bg-light" />
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => deleteShow(show.id)}
                    >
                      Delete Show
                    </button>
                  </li>
                  <li>
                    <label
                      className="dropdown-item"
                      onClick={() =>
                        localStorage.setItem("carousel", show.title)
                      }
                    >
                      Add to Main Page
                    </label>
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
              {!isShowToUpdate && !sucmessage && !message && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Create Show
                </h5>
              )}
              {isShowToUpdate && !sucmessage && !message && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Show
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
                  min={new Date().toISOString().split("T")[0]}
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
                  required
                />
                <label className="form-label">
                  Upload Poster of show (preferred square)
                </label>
                <div>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                    checked={mainpg}
                    onChange={handleChange}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    {mainpg ? (
                      <span>
                        Added to Main Page<FaCheckDouble />
                      </span>
                    ) : (
                      <span>Set to Main Page</span>
                    )}
                  </label>
                </div>
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
                  {!isShowToUpdate && !sucmessage && !message
                    ? "Create Show"
                    : "Update Show"}
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