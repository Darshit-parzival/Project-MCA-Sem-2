import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [contactData, setContactData] = useState([]);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");
  const [msg,setMsg] = useState("")

  const handleChangeRowsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setRowsPerPage(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/contact/data/");
      if (response.data.success) {
        setContactData(response.data.data);
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/contact/delete/",
        { id: id }
      );
      if (response.data.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  const handleSendReply = (email, id) => {
    setId(id);
    setEmail(email);
  };

  const handleReset = () => {
    setId("")
    setEmail("")
    setReply("")
  };

  const handleReply = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8000/contact/reply/",
        { id: id , email: email }
      );
      if (response.data.success) {
        setMsg(response.data.message)
        fetchData();
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Messages from Fans</h4>
      </div>
      <label className="me-2" htmlFor="rowsPerPage">
        Rows per page:
      </label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={handleChangeRowsPerPage}
      >
        <option value={3}>3</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={-1}>ALL</option>
      </select>
      <div className="row mt-3">
        {rowsPerPage === -1
          ? contactData.map((contact, index) => (
              <div key={index} className="col-lg-4 mb-3">
                <div className="card text-white bg-dark">
                  <div className="card-body">
                    <h5 className="card-title">Name: {contact.name}</h5>
                    <p className="card-text text-muted">
                      email: {contact.email}
                    </p>
                    <p className="card-text">Message: {contact.msg}</p>
                    {contact.replied && (
                      <p className="text-success card-text">You have Replied to This fan</p>
                    )}
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(contact.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#reply"
                        onClick={() =>
                          handleSendReply(contact.email, contact.id)
                        }
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : contactData.slice(0, rowsPerPage).map((contact, index) => (
              <div key={index} className="col-lg-4 mb-3">
                <div className="card text-white bg-dark">
                  <div className="card-body">
                    <h5 className="card-title">Name: {contact.name}</h5>
                    <p className="card-text text-muted">
                      email: {contact.email}
                    </p>
                    <p className="card-text">Message: {contact.msg}</p>
                    {contact.replied && (
                      <p className="text-success card-text">You have Replied to This fan</p>
                    )}
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(contact.id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#reply"
                        onClick={() =>
                          handleSendReply(contact.email, contact.id)
                        }
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div
        className="modal fade text-white"
        id="reply"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {msg ? msg : "Send Reply"}
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleReset}
              ></button>
            </div>
            <form
              method="post"
              onSubmit={handleReply}
            >
              <textarea
                className="form-control mb-3"
                placeholder="Write Your Reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                required
              ></textarea>
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
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
