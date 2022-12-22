import { TextField, Button } from "@mui/material";
import React, { useState } from "react";

const ActivityDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("firstName", firstName);

    myForm.set("lastName", lastName);

    // axios
    //   .post("http://localhost:5000/api/contact/add", myForm)
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };
  return (
    <>
      <div className="container text-center mt-5">
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

          <Button
            id="createProductBtn"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!firstName || !lastName}
            className="send-button"
            //   onClick={handleShow}
          >
            {/* Send */}
            <div class="alt-send-button">
              <i class="fa fa-paper-plane"></i>
              <span class="send-text">SEND</span>
            </div>
          </Button>
        </form>
        {/* <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title> 
        </Modal.Header>
        <Modal.Body>Data has been Sent SUCCESSFULLY!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>  */}
      </div>
    </>
  );
};

export default ActivityDetails;
