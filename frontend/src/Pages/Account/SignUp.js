import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./utilities/Forms";
import './style.css'
import { Row, Col } from "react-bootstrap";
import logo from '../../Assets/logo/logo.png'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
  
    const validateRegister = () => {
      let isValid = true;
  
      let validator = Form.validator({
        name: {
          value: name,
          isRequired: true,
        },
        email: {
          value: email,
          isRequired: true,
          isEmail: true,
        },
        password: {
          value: password,
          isRequired: true,
          minLength: 6,
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
  
    const register = (e) => {
      e.preventDefault();
  
      const validate = validateRegister();
  
      if (validate) {
        setValidate({});
        setName("");
        setEmail("");
        setPassword("");
        alert("Successfully Register User");
      }
    };
  
    const togglePassword = (e) => {
      if (showPassword) {
        setShowPassword(false);
      } else {
        setShowPassword(true);
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
          <div className="d-flex flex-column align-content-end" style={{ marginTop: "20%" }}>
            <div className="auth-body mx-auto">
              <h4 style={{marginBottom:"20px"}}>Create your Account</h4>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  method="POST"
                  onSubmit={register}
                  autoComplete={"off"}
                >
                  <div className="name mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        validate.validate && validate.validate.name
                          ? "is-invalid "
                          : ""
                      }`}
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
  
                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.name
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.name
                        ? validate.validate.name[0]
                        : ""}
                    </div>
                  </div>
  
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
  
                  <div className="password mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          validate.validate && validate.validate.password
                            ? "is-invalid "
                            : ""
                        }`}
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
  
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={(e) => togglePassword(e)}
                      >
                        <i
                          className={
                            showPassword ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>{" "}
                      </button>
  
                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.password
                            ? "d-block"
                            : "d-none"
                        }`}
                      >
                        {validate.validate && validate.validate.password
                          ? validate.validate.password[0]
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
  
                <hr />
                <div className="auth-option text-center pt-2">
                  Have an account?{" "}
                  <Link className="text-link" to="/login">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  };

export default SignUp