import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./utilities/Forms";
import './style.css'
import { Row, Col } from "react-bootstrap";
import logo from '../../Assets/logo/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../Redux/Actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const auth = useSelector((state)=>state.auth)
  const {error} = useSelector((state)=>state.auth)
  // console.log(error)
  const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    // const [values, setValues] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [show,setShow] = useState(false)
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const handleShow = () => {
      if (!isEmail(email)) {
        setShow(false);
      } else if (isEmail(email)) {
        setShow(true);
      }
    };
    // const validateRegister = () => {
    //   let isValid = true;
  
    //   let validator = Form.validator({
    //     firstName: {
    //       value: firstName,
    //       isRequired: true,
    //     },
    //     lastName: {
    //       value: lastName,
    //       isRequired: true,
    //     },
    //     email: {
    //       value: email,
    //       isRequired: true,
    //       isEmail: true,
    //     },
    //     password: {
    //       value: password,
    //       isRequired: true,
    //       minLength: 6,
    //     },
    //   });
  
    //   if (validator !== null) {
    //     setValidate({
    //       validate: validator.errors,
    //     });
  
    //     isValid = false;
    //   }
    //   return isValid;
    // };
    const isEmail = (email) =>
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      email
    );

    // const register = (e) => {
    //   e.preventDefault();
  
    //   const validate = validateRegister();
  
    //   if (validate) {
    //     setValidate({});
    //     setFirstName("");
    //     setLastName("");
    //     setEmail("");
    //     setPassword("");
    //     alert("Successfully Register User");
    //   }
    // };
  
    const togglePassword = (e) => {
      if (showPassword) {
        setShowPassword(false);
      } else {
        setShowPassword(true);
      }
    };
    const registerUser = (e) => {
      e.preventDefault();
  
      const errors = {};

      if (!isEmail(email)) {
        errors.email = "Invalid email!";
      } 
      setErrors(errors);

      const user = {
        firstName,
        lastName,
        email,
        password,
      };
  
      dispatch(signup(user));
      if(!auth.authenticate){
        toast.error(error, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
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
                  onSubmit={registerUser}
                  autoComplete={"off"}
                >
                  <div className="name mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        validate.validate && validate.validate.firstName
                          ? "is-invalid "
                          : ""
                      }`}
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
  
                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.firstName
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.firstName
                        ? validate.validate.firstName[0]
                        : ""}
                    </div>
                  </div>
  
                  <div className="name mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        validate.validate && validate.validate.lastName
                          ? "is-invalid "
                          : ""
                      }`}
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
  
                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.lastName
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.lastName
                        ? validate.validate.lastName[0]
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
  
                    {/* <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.email
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.email
                        ? validate.validate.email[0]
                        : ""}
                    </div> */}
                    {Object.entries(errors).map(([key, error]) => (
                          <span
                            key={`${key}: ${error}`}
                            style={{
                              fontWeight: "bold",
                              color: "red",
                              display: "flex",
                              marginLeft: "7px",
                            }}
                          >
                            {error}
                          </span>
                        ))}
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
                      disabled={
                        !firstName || !lastName || !email || !password
                      }
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
        <ToastContainer/>
      </Row>
    );
  };

export default SignUp