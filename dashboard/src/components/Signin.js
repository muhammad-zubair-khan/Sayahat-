import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/adminActions";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
// import logo from "../assets/logo/logo-black.png";
import logo from "../assets/logo/logo.png";

const Signin = () => {
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const adminLogin = (e) => {
    e.preventDefault();

    const admin = {
      email,
      password,
    };

    dispatch(login(admin));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  // const submitHandler = (e) =>{
  //     e.preventDefault();
  //     dispatch(login(email,password));
  // };
  return (
    <Container>
      <Row>
        <Col md={6} style={{ marginTop: "100px" }}>
          <img
            src={logo}
            alt="SAYAHAT"
            style={{ width: "-webkit-fill-available"}}
          />
        </Col>
        <Col md={6} style={{ marginTop: "150px" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Login to Access Dashboard
          </Typography>
          <hr />
          <Form onSubmit={adminLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      </Container> 
  );
};

export default Signin;
