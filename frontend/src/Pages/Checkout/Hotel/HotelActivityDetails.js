import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CheckoutSteps from "../CheckoutSteps";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveContactInfo,
  saveHotelContactInfo,
} from "../../../Redux/Actions/checkout";
import { Grid } from "@mui/material";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import useFetch from "../../../hook/useFetch";
import { getHotelDetailById } from "../../../Redux/Actions/hotelAction";

const HotelActivityDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [totalPrice, setTotalPrice] = useState(location.state.state.totalPrice);
  const [selectedRooms, setSelectedRooms] = useState(location.state.state.selectedRooms);
  const [show, setShow] = useState(false);
  const { hotel } = useSelector((state) => state.hotelById);
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/room/${id}`
  );

  useEffect(() => {
    dispatch(getHotelDetailById(id));
  }, [dispatch,id]);

  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const SubmitHotelContactInfo = (e) => {
   
    const data = {
      destination,
      firstName,
      lastName,
      dates,
      options,
    };

    sessionStorage.setItem("hotelActivityInfo", JSON.stringify(data));
    history.push(`/hotelBooking/${id}/process/payment`, {
        state: { destination, dates, options, totalPrice,selectedRooms },
      });
  };
 
  if (Object.keys(hotel).length === 0) {
    return null;
  }
  return (
    <>
      <Grid container style={{ margin: "106px 43px" }}>
        <Grid lg={6}>
          <CheckoutSteps activeStep={1} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <img src={ImageUrl(hotel.hotelImages[0].img)} style={{width:"35%"}} alt="" />
              <b>{hotel.name}</b>
            </span>
            <span>
              <b>PKR {totalPrice}</b>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "14px 19px",
            }}
          >
            {/* <span>Pick-up Time: {pickupTime}</span>
                    <span>Drop-off Time: {dropoffTime}</span> */}
            <span className="siTaxiOp mb-1">{hotel.address}</span>
            <span className="siTaxiOp">{hotel.title}</span>

            <p style={{ marginTop: "10px" }}>
              Total Price: <span>PKR {totalPrice}</span>{" "}
            </p>
          </div>

          <div className="container mt-2">
            <b>Adult 1</b>
            <form
              encType="multipart/form-data"
              onSubmit={SubmitHotelContactInfo}
              // className="col-md-6 mt-5"
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

              {/* {options.adult >= 2 && (
                      <>
                        Adult 2
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
                      </>
                    )}
                    {console.log(options)}
                    {options.adult >= 3 && (
                      <>
                        Adult 3
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
                      </>
                    )} */}

              {/* <Button
                        id="createProductBtn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!firstName || !lastName}
                        className="send-button"
                      >
                        <div class="alt-send-button">
                          <i class="fa fa-paper-plane"></i>
                          <span class="send-text">SEND</span>
                        </div>
                      </Button> */}
              <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                // disabled={state ? false : true}
              />
            </form>
          </div>
        </Grid>
        <Grid
          lg={6}
          style={{ padding: "57px 78px", backgroundColor: "#f5f5f5" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span>
              <img
                src={ImageUrl(hotel.hotelImages[0].img)}
                style={{ width: "30%" }}
                alt=""
              />
              <b>{hotel.name}</b>
            </span>
            <span>
              <b>PKR {totalPrice}</b>
            </span>
          </div>
          <div
            style={{
              marginLeft: "36px",
              marginBottom: "30px",
              marginTop: "15px",
              color: "#929292",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{hotel.address}</span>
            {/* <span>{hotel.title}</span> */}
            <span> Check-in date: {`${dates[0].startDate}`}</span>
            <span> Check-out date: {`${dates[0].endDate}`}</span>
            <span>Adults: {options.adult}</span>
            <span>Children: {options.children}</span>
            <span>Rooms: {options.room}</span>
            {/* <span>
              Room no:
              <span className="siTaxiOp">{selectedRooms}</span>
            </span> */}

            <hr />
          </div>
          <div
            style={{
              marginLeft: "36px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <b>Total Price</b>
            <b>PKR {totalPrice}</b>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HotelActivityDetails;
