import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleDown } from "react-icons/fa";
import axios from "axios";
import FormData from "form-data";

const Comedians = () => {
  const [comedianData, setComedianData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/comedian/data/"
      );
      if (response.data.success) {
        setComedianData(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");

  const unsetHandle = () => {
    setName("");
    setDescription("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", document.getElementById("imageUpload").files[0]);

      const response = await axios.post(
        "http://127.0.0.1:8000/comedian/create/",
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
        fetchData();
      } else {
        setMessage(response.data.message);
        unsetHandle();
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Error adding comedian");
      unsetHandle();
    }
  };

  const updateComedian = (comedian) => {
    setId(comedian.id)
    setName(comedian.name)
    setDescription(comedian.description)    
  };

  const handleSubmitUpadate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", document.getElementById("imageUpload").files[0]);

      const response = await axios.post(
        "http://127.0.0.1:8000/comedian/update/",
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
        fetchData()
      } else {
        setMessage(response.data.message);
        unsetHandle();
        console.log(response.data);
      }
    } catch (error) {
      setMessage("Error updating comedian");
      unsetHandle();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Comdians</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ width: "auto" }}
        >
          Add Comedians
        </button>
      </div>
      <div className="row row-cols-2 g-3">
        {comedianData.map((comedian, index) => (
          <div key={index} className="col">
            <div className="card bg-dark text-white">
              <img
                src={`data:image/jpeg;base64, ${comedian.image_data}`}
                className="card-img-top"
                style={{ objectFit: "contain" }}
                alt={`comedian ${index + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">{comedian.name}</h5>
                <p className="card-text">{comedian.description}</p>
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
                      data-bs-target="#updatecomedian"
                      onClick={() => updateComedian(comedian)}
                    >
                      Update Comedian
                    </button>
                  </li>
                  <hr className="dropdown-divider bg-light" />
                  <li>
                    <button className="dropdown-item">Delete Comedian</button>
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
                  Add Comedian
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="form-label">Enter Name</label>
                <textarea
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value.toLowerCase())}
                  required
                ></textarea>
                <label className="form-label">Enter Description</label>
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control"
                  accept="image/jpeg, image/jpg"
                  required
                />
                <label className="form-label">
                  Upload Picture of Comedian (preferred square)
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
                  Add Comedian
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Update Comedian */}
      <div
        className="modal fade text-white"
        id="updatecomedian"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
        
            {!sucmessage && !message && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Comedian
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
            <form method="post" onSubmit={handleSubmitUpadate}>
              <div className="modal-body">
                <input
                  type="text"
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="form-label">Edit Name</label>
                <textarea
                  id="form3Example3c"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <label className="form-label">Enter Description of Show</label>
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control"
                  accept="image/jpeg, image/jpg"
                />
                <label className="form-label">
                  Upload Picture of Comedian (preferred square)
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
                  Update Comedian
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comedians;
