import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Redux/Actions/adminActions";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
// import logo from "../assets/logo/logo-black.png";
import logo from "../assets/logo/logo.png";

const Signup = () => {
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const adminSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
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
            style={{ width: "-webkit-fill-available" }}
          />
        </Col>
        <Col md={6} style={{ marginTop: "150px" }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Sign up 
          </Typography>
          <hr />
          <Form onSubmit={adminSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                type="text"
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                type="text"
                placeholder="Enter last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
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
              Register
            </Button>
            <Link style={{marginLeft:'10px'}} to='/login'>Already have an Account? Login</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
