import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Row, Col } from "react-bootstrap";
import logo from "../../Assets/logo/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../Redux/helpers/axios";
import MetaData from "../../Components/MetaData/MetaData";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState({});

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your email");
    }
    try {
      const data = { email };
      const response = await axios("/sendpasswordlink", {
        method: "POST",
        config: { headers: { "Content-Type": "application/json" } },
        data: data,
      });
      if (response.data.message) {
        if (response.data.message === "User not found") {
          toast.error("Email not exists");
        } else {
          toast.success("Password reset link sent to your email");
        }
      }
       else {
        toast.error("Invalid User");
      }
    } 
  catch (error) {
      console.log(error);
      toast.error("Invalid User");
    }
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage:
              "linear-gradient(to right top, #173f4a, #395c5e, #5f7a72, #88988a, #b2b7a7)",
            height: "100vh",
          }}
        >
          <img
            src={logo}
            alt=""
            style={{ width: "-webkit-fill-available", marginTop: "10%" }}
          />
        </Col>

        <Col md={6} className="text-center bgimg">
          <div
            className="d-flex flex-column align-content-end"
            style={{ marginTop: "20%" }}
          >
            <div className="auth-body mx-auto">
              <h5 style={{ marginBottom: "20px" }}>Forgot Password</h5>
              {/* {message ? (
                <p style={{ fontWeight: "bolder" }}>
                  password reser link send Successfully in your Email
                </p>
              ) : (
                ""
              )} */}
              <div className="auth-form-container text-start">
                <form className="auth-form" autoComplete={"off"}>
                  <div className="email mb-3">
                    <input
                      required
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                      onClick={forgotPassword}
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
                <ToastContainer />

                <hr />
                <div className="auth-option text-center pt-2">
                  <Link className="text-link" to="/login">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Forgot;
