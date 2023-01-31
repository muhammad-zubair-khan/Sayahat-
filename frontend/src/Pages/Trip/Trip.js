import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../../Components/MetaData/MetaData";
import Navbar from "../../Navbar/Navbar";
import "./Trip.css";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Trip = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trips, setTrips] = useState([]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const loggedInData = () => {
    return (
      <div className="container main-trip-container">
        <div>
          <small onClick={handleOpenModal} style={{ cursor: "pointer" }}>
            + Create a trip
          </small>
        </div>
        <div style={{ textAlign: "left" }}>
          <h1 className="trip-heading">Trips</h1>
        </div>
        <section>
          <img
            src="https://a.travel-assets.com/egds/illustrations/uds-default/baggage__large.svg"
            alt="book trip"
          />
        </section>
        <div>
          <p>zubair, you have no upcoming trips. Where are you going next?</p>
        </div>
        <div>
          <Link to="/" className="trip-login-button">
            Start exploring
          </Link>
        </div>
      </div>
    );
  };

  const nonLoggedInData = () => {
    return (
      <div className="container main-trip-container">
        <div style={{ textAlign: "left" }}>
          <h1 className="trip-heading">Trips</h1>
        </div>
        <section>
          <img
            src="https://a.travel-assets.com/egds/illustrations/uds-default/unlock__large.svg"
            alt="find trip"
          />
        </section>
        <div>
          <Link to="/login" className="trip-login-button">
            Sign in or create free account
          </Link>
        </div>
      </div>
    );
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getTrips = async () => {
    const response = await axios("http://localhost:5000/api/trips", {
      method: "GET",
    });
    setTrips(response.data.trips);
  };

  useEffect(() => {
    getTrips();
  }, []);

  const showCreatedTrip = () => {
    return (
      <>
        <div className="container main-trip-container">
          <div style={{ textAlign: "left" }}>
            <h1 className="trip-heading"> Trip</h1>
          </div>
          <div>
          <small onClick={handleOpenModal} style={{ cursor: "pointer",float:'right' }}>
            + Create a trip
          </small>
        </div>
          <div style={{ textAlign: "left" }}>
            <h1 className="trip-heading"> Potential</h1>
          </div>
          {trips && trips.map((data)=>{
            return(
              <>
          <section key={data._id} style={{ position: "relative",padding:"13px 0px" }}>
            <Link to={`/trip/${data.name}/${data._id}`}>
            <img
              src="https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFob3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              style={{ width: "45%", filter: "brightness(0.5)" }}
              alt="saved trip"
            />
            <div
              style={{
                position: "absolute",
                top: "80%",
                left: "31%",
                color: "white",
                fontSize:'large'
              }}
            >
              {data.name} 
            </div>
            </Link>

          </section>
              
              </>
            )
          })}
        </div>
      </>
    );
  };
  const handleSearch = async () => {
    if (name) {
      setError("");
      const token = localStorage.getItem("token");
      const data = { name, description };
      const response = await axios("http://localhost:5000/api/create/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: data,
      });
      getTrips()
      setOpen(false);
    } else {
      setError("Please enter trip name");
    }
  };

  return (
    <>
      <MetaData title={`Trips`} />
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      {localStorage.token ?  (!trips ? loggedInData() : "") : (trips ? nonLoggedInData() : "")}
      {localStorage.token ? (trips.length===0 ? loggedInData() : showCreatedTrip()) : ""}
      {open && (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Create a new trip
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Track things you love and plan your whole trip
                </Typography>
                <TextField
                  required
                  sx={{ mt: 2 }}
                  id="outlined-basic-1"
                  label="Trip name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}

                <TextField
                  sx={{ mt: 2 }}
                  id="outlined-basic-2"
                  label="Description (optional)"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleSearch}
                >
                  Save
                </Button>
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Trip;
