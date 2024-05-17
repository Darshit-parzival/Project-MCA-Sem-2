import { useEffect, useState } from "react";
import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";
import axios from "axios";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  
  useEffect(() => {
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

    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">FAQ</p>
      </div>

      <div className="container-fluid">
      <label className="me-2" htmlFor="rowsPerPage">
        Rows per page:
      </label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        className="mb-4"
        onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
        >
        <option value={3}>3</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <div className="row">
        
        {faqData.slice(0, rowsPerPage).map((faq, index) => (
          <div key={index} className="col-lg-4 mb-3">
            <div className="card text-white bg-dark" style={{borderColor:"white"}}>
              <div className="card-body">
                <h5 className="card-title">{faq.question}</h5>
                <p className="card-text">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
