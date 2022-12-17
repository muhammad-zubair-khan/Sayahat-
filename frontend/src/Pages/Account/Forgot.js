import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./utilities/Forms";
import './style.css'
import { Row, Col } from "react-bootstrap";
import logo from '../../Assets/logo/logo.png'

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [validate, setValidate] = useState({});
  
    const validateforgotPassword = () => {
      let isValid = true;
  
      let validator = Form.validator({
        email: {
          value: email,
          isRequired: true,
          isEmail: true,
        },
      });
  
      if (validator !== null) {
        setValidate({
          validate: validator.errors,
        });
  
        isValid = false;
      }
      return isValid;
    };
  
    const forgotPassword = (e) => {
      e.preventDefault();
  
      const validate = validateforgotPassword();
  
      if (validate) {
        alert("Reset password link is sent to " + email);
        setValidate({});
        setEmail("");
      }
    };
  
    return (
      <Row>
        <Col md={6} style={{
          backgroundImage:
            "linear-gradient(to right top, #173f4a, #395c5e, #5f7a72, #88988a, #b2b7a7)",
          height: "100vh",
        }}>
        <img
          src={logo}
          alt=""
          style={{ width: "-webkit-fill-available", marginTop: "10%" }}
        />
        </Col>
  
        <Col md={6} className="text-center bgimg">
          <div className="d-flex flex-column align-content-end"  style={{ marginTop: "20%" }}>
            <div className="auth-body mx-auto">
              <h5 style={{ marginBottom: "20px" }}>Forgot Password</h5>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  method="POST"
                  onSubmit={forgotPassword}
                  autoComplete={"off"}
                >
                  <div className="email mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        validate.validate && validate.validate.email
                          ? "is-invalid "
                          : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
  
                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.email
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.email
                        ? validate.validate.email[0]
                        : ""}
                    </div>
                  </div>
  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
  
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
    );
  };

export default Forgot