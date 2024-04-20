import Header from "../includes/components/Header";
import "../includes/assets/css/about.css";
import Footer from "../includes/components/Footer";

const About = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center w-100 p-3"
        style={{ backgroundColor: "rgb(17,17,17)" }}
      >
        <p className="h1">ABOUT</p>
      </div>
      <div className="container-fluid">
        <div className="row about-section">
          <div className="col">
            <div
              className="description-box mt-5 mb-5 p-4"
              style={{ backgroundColor: "rgb(17,17,17)", marginTop: "10px" }}
            >
              <h4>About Comedy Club</h4>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                laboriosam repudiandae dignissimos amet inventore exercitationem
                consequuntur. Praesentium, ad eligendi, perferendis dolor nihil
                ipsam itaque, expedita voluptate voluptatum maiores quas ab.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="video-container text-center">
              <iframe
                src="https://www.youtube.com/embed/_GaeKNLTMeA?si=wINvW2nfpXZ27Fh8&amp;start=60"
                width="560"
                height="315"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
