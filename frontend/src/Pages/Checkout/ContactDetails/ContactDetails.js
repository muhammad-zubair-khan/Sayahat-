import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
//
// import "./TechContactForm.css";
import { Link, useHistory } from "react-router-dom";

const ContactDetails = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    // navigate(0);
  };
  const handleShow = () => {
    if (!isEmail(values.email)) {
      setShow(false);
    } else if (isEmail(values.email)) {
      setShow(true);
    }
  };
  const history = useHistory();
  const isEmail = (email) =>
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      email
    );

    const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ email: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");

  //   const onChangeFile = (e) => {
  //     setContactImage(e.target.files[0]);
  //   };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("firstName", firstName);

    myForm.set("lastName", lastName);

    const errors = {};

    if (!isEmail(values.email)) {
      errors.email = "Invalid email!";
    } else if (isEmail(values.email)) {
      myForm.set("email", values.email);
    }
    setErrors(errors);

    myForm.set("phone", phone);

    // axios
    //   .post("http://localhost:5000/api/contact/add", myForm)
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };
  const setEmail = (e) => {
    setValues((values) => ({ ...values, email: e.target.value }));
  };
  return (
    <div className="container text-center mt-5">
      <h4 style={{ color: "black" }} className="my-3">
        We'll use this information to send you confirmation and updates about
        your booking
      </h4>
      <h5 style={{ color: "black" }} className="mt-3">
        Already have an account?
        <span>
          <Link to="/login">Log in</Link>
        </span>
      </h5>
      <form
        encType="multipart/form-data"
        onSubmit={createProductSubmitHandler}
        className="col-md-6 mt-5"
        style={{ margin: "0 auto" }}
      >
        <div className="my-3 inputField">
          <TextField
            autoComplete="off"
            fullWidth
            required
            id="outlined-required"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="my-3 inputField">
          <TextField
            autoComplete="off"
            fullWidth
            required
            id="outlined-required"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="my-3 inputField">
          <TextField
            autoComplete="off"
            fullWidth
            required
            id="outlined-required"
            label="Email"
            value={values.email}
            onChange={setEmail}
          />
        </div>
        <div className="my-3 inputField">
          <TextField
            autoComplete="off"
            type="number"
            fullWidth
            required
            id="outlined-required"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
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
        {/* <div className="my-3 inputField">
          <label>
            <i className="fa fa-phone" aria-hidden="true"></i> Phone number
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
          autoComplete="off"
            type="number"
            className="form-control"
            placeholder="your Phone no"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div> */}

        {/* <Button
          id="createProductBtn"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!firstName || !lastName || !values.email || !phone}
          className="send-button"
          onClick={handleShow}
        >
          <div class="alt-send-button">
            <i class="fa fa-paper-plane"></i>
            <span class="send-text">SEND</span>
          </div>
        </Button> */}
      </form>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Data has been Sent SUCCESSFULLY!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactDetails;
