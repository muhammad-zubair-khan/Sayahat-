import React, { useEffect, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
import { Row, Col } from "react-bootstrap";
import logo from "../../Assets/logo/logo.png";
import axios from "../../Redux/helpers/axios";

const Forgot = () => {
  const { id, token } = useParams();

  const history = useHistory();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await axios(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
    const data = {password} 

      const res = await axios(`/save/${id}/${token}`, {
        method: "POST",
        config: { headers: { "Content-Type": "application/json" } },
        // body: JSON.stringify({ password }),
        data:data
      });

      const result = await res.json();

      if (result.status == 201) {
        setPassword("");
        setMessage(true);
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    userValid();
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data2 ? (
        <>
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
                  <h4 style={{ marginBottom: "20px" }}>
                    Enter your New Password
                  </h4>
                  <div className="auth-form-container text-start">
                    <form>
                      {message ? (
                        <p style={{ color: "green", fontWeight: "bold" }}>
                          Password Succesfully Update{" "}
                        </p>
                      ) : (
                        ""
                      )}
                      {/* <div className="form_input">
                        <label htmlFor="password">New password</label>
                        <input
                          type="password"
                          value={password}
                          onChange={setval}
                          name="password"
                          id="password"
                          placeholder="Enter Your new password"
                        />
                      </div> */}
                      <div className="password mb-3">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={setval}
                            name="password"
                            id="password"
                            placeholder="Enter Your new password"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={sendpassword}
                          className="btn btn-primary w-100 theme-btn mx-auto"
                        >
                          Send
                        </button>
                      </div>
                    </form>

                    <p className="text-center">
                      <NavLink to="/">Home</NavLink>
                    </p>
                    <ToastContainer />
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* </section> */}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Forgot;
