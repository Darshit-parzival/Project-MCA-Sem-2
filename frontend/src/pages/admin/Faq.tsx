import { useState, useEffect } from "react";
import axios from "axios";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/faq/data/");
      if (response.data.success) {
        setFaqData(JSON.parse(response.data.data));
      }
    } catch (error) {
      console.error("Data fetching failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sucmessage, setSucMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/faq/add/", {
        question,
        answer,
      });
      if (response.data.success) {
        setSucMessage(response.data.message);
        setAnswer("");
        setQuestion("");

        const updatedResponse = await axios.post(
          "http://localhost:8000/faq/data/"
        );
        if (updatedResponse.data.success) {
          setFaqData(JSON.parse(updatedResponse.data.data));
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error adding faq");
    }
  };

  const unsetHandle = () => {
    setAnswer("");
    setQuestion("");
    setSucMessage("");
    setMessage("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4>Frequently Asked Questions?</h4>
        <button
          type="button"
          className="btn-card"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add FAQ
        </button>
      </div>
      <label className="me-2" htmlFor="rowsPerPage">
        Rows per page:
      </label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
      >
        <option value={3}>3</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <div className="row">
        {faqData.slice(0, rowsPerPage).map((faq, index) => (
          <div key={index} className="col-lg-4 mb-3">
            <div className="card text-white bg-dark">
              <div className="card-body">
                <h5 className="card-title">{faq.question}</h5>
                <p className="card-text">{faq.answer}</p>
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
                  Add FAQ
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
              <input
                type="text"
                id="form3Example3c"
                className="form-control"
                placeholder="Enter your que"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <label className="form-label">Enter Question</label>
              <input
                type="text"
                id="form3Example3c"
                className="form-control"
                placeholder="Enter your Ans"
                value={answer}
                onChange={(e) => setAnswer(e.target.value.toLowerCase())}
              />
              <label className="form-label">Enter Answer</label>
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
                  Add FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
