import Footer from "../includes/components/Footer";
import Header from "../includes/components/Header";

const Faq = () => {
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
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box p-4 mb-5 mt-5"
              style={{ backgroundColor: "rgb(17,17,17)" }}
            >
                <h6>Question</h6>
                <p>Answer</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
