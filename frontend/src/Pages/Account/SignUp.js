import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { Row, Col } from "react-bootstrap";
import logo from "../../Assets/logo/logo.png";
import { useDispatch } from "react-redux";
import {signup } from "../../Redux/Actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../../Components/MetaData/MetaData";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const registerUser = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      return toast.error("All fields are required");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return toast.error("Invalid email address");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match', { appearance: 'error', autoDismiss: true });
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      dispatch(signup(user));
      toast.success("Account created successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      history.push("/");
    } catch (err) {
      if (err.response.data.msg === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error(err.response.data.msg);
      }
    }
    // if (!auth.authenticate) {
    //   toast.error(error, {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    // }
  };

  return (
    <>
      <MetaData title={"Create an account"} />
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
              <h4 style={{ marginBottom: "20px" }}>Create your Account</h4>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  onSubmit={registerUser}
                  autoComplete={"off"}
                >
                  <div className="name mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                  </div>

                  <div className="name mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="email mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="password mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
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
                    </div>
                  </div>
                  <div className="password mb-3">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        name="Confirm Password"
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
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
        <ToastContainer />
      </Row>
    </>
  );
};

export default SignUp;
