import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./style.css";
import logo from "../../Assets/logo/logo.png";
import { Row, Col } from "react-bootstrap";
import { login } from "../../Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../Components/MetaData/MetaData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const signuInUser = (e) => {
    e.preventDefault();
    if(!email || !password){
      return toast.error("Please enter your email and password",{
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }

    const user = {
      email,
      password,
    };

    dispatch(login(user));
    window.history.back()
    // toast.success("Successfully login",{
    //   position: toast.POSITION.BOTTOM_CENTER,
    // })
  };

  // if (auth.authenticate) {
  //   // return <Redirect to={`/`} />;
  //   return window.history.back();
  // }

  return (
    <>
      <MetaData title={"Sign In"} />
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

        <Col className="text-center bgimg">
          <div
            className="d-flex flex-column align-content-end"
            style={{ marginTop: "20%" }}
          >
            <div className="auth-body mx-auto">
              <h4 style={{ marginBottom: "20px" }}>Login to your account</h4>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  onSubmit={signuInUser}
                  autoComplete={"off"}
                >
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

                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) =>
                              setRemember(e.currentTarget.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <Link to="/reset-password">Forgot password?</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                    </button>
                  </div>
                </form>

                <hr />
                <div className="auth-option text-center pt-2">
                  No Account?{" "}
                  <Link className="text-link" to="/register">
                    Sign up{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <ToastContainer/>
      </Row>
    </>
  );
};

export default Login;
