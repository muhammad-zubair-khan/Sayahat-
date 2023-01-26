import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import MetaData from "../../Components/MetaData/MetaData";

const Contactus = () => {
  return (
    <>
    <MetaData title={`Contact us`}/>
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      <img
        style={{ height: "30vh", objectFit: "cover" }}
        src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
        alt="Girl in a jacket"
        className="img-fluid w-100"
      />

      <div className="container my-5">
        <div className="row">
          <h3 className="text-black">Contact Us</h3>
          <p className="text-black">
            Are you a traveler in need of help? Have a question about your
            review? Problems booking your hotel, flight or attraction/activity?
            Trouble with a restaurant reservation?
            <br />
            We want to help! Did you know that nearly every customer service
            questions can be answered. Please fill the form. We'll reach you in
            2 business days. Thank You!
          </p>

          <h4 className="text-black">General Contact Information</h4>
          <p className="text-black">
            Mailing address: Sayahat, 40 E 1 Shahrah-e-Hazrat Imam Hussain,
            Block E1 Block E 1 Gulberg III, Lahore, Punjab 54660
            <br />
            General company phone number: +92 324 8005000
          </p>

          <section className="mb-4">
            <h2 className="h1-responsive font-weight-bold text-center my-4 text-black">
              Contact us
            </h2>

            <p className="text-center w-responsive mx-auto mb-5 text-black">
              Do you have any questions? Please do not hesitate to contact us
              directly. Our team will come back to you within a matter of hours
              to help you.
            </p>

            <div className="row g-0">
              <div className="col-md-9 mb-md-0 mb-5">
                <form
                  id="contact-form"
                  name="contact-form"
                  action="mail.php"
                  method="POST"
                >
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label for="name" className="">
                          Your name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label for="email" className="">
                          Your email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="md-form mb-0">
                        <label for="subject" className="">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          placeholder="Enter the question"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <div className="md-form">
                        <label for="message">Your message</label>
                        <textarea
                          type="text"
                          id="message"
                          name="message"
                          rows="2"
                          className="form-control md-textarea"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="text-center text-md-left">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    onclick="document.getElementById('contact-form').submit();"
                  >
                    Submit
                  </Link>
                </div>
                <div className="status"></div>
              </div>

              <div className="col-md-3 text-center">
                <ul className="list-unstyled mb-0">
                  <li>
                    <i className="fas fa-map-marker-alt fa-2x text-black"></i>
                    <p className="text-black">Gulberg III, Lahore, Punjab</p>
                  </li>

                  <li>
                    <i className="fas fa-phone mt-4 fa-2x text-black"></i>
                    <p className="text-black">+92 324 8005000</p>
                  </li>

                  <li>
                    <i className="fas fa-envelope mt-4 fa-2x text-black"></i>
                    <p className="text-black">contact@sayahat.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="container-fluid bg-dark text-center">
        <h1 className="pt-5 text-white">Save time, save money!</h1>
        <h5 className="text-white pb-2">
          Sign up and we'll send the best deals to you
        </h5>
        <div className="container d-flex justify-content-center pb-5">
          <div className="row g-2">
            <div className=" col-md-8">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className=" col-md-4">
              <button type="button" className="btn btn-primary h-75">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contactus;
