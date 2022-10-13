import { Container } from "@material-ui/core";
import React, { useState, } from"react";
import { Row, Col } from "react-bootstrap"
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions";
import logo from '../../assets/logo/SAYAHAT.png'


const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error,setError] = useState('');
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
      e.preventDefault();

    const user = {
      email,password
    }

    dispatch(login(user));
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
}
  return (
    // <img src={logo} alt="Jani Motors" />
    // md={{ span: 6, offset: 3 }}
    <>
    {/* <Header/> */}
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col md={6} style={{marginTop:'90px'}}>
            <img src={logo} alt="Sayahat" />
          </Col>
          <Col md={6}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Login to Access Dashboard
            </Typography>
            <hr />
            <Form onSubmit={userLogin}>
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
    </>
  );
};
export default SignIn;
