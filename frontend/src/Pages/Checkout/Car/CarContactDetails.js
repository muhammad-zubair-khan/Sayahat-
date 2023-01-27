import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import MetaData from "../../../Components/MetaData/MetaData";
import { getCarById } from "../../../Redux/Actions/carAction";
import { saveCarContactInfo } from "../../../Redux/Actions/checkout";
import { ImageUrl } from "../../../Redux/UrlConfig";
import CarCheckoutSteps from "../CarCheckoutSteps";
// import CheckoutSteps from "../CheckoutSteps";

const CarContactDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(
    location.state.state.dropoffTime
  );
  const [totalPrice, setTotalPrice] = useState(location.state.state.totalPrice);

  const { car } = useSelector((state) => state.addCarReducer);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  const isEmail = (email) =>
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      email
    );
  const [active, setActive] = useState(0);
  // carContactCheckout

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");

  const SubmitContactInfo = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("firstName", firstName);
    myForm.set("lastName", lastName);
    const errors = {};
    if (!isEmail(email)) {
      errors.email = "Invalid email!";
    } else if (isEmail(email)) {
      myForm.set("email", email);
    }
    setErrors(errors);
    myForm.set("phone", phone);
    myForm.set("nic", nic);
    dispatch(saveCarContactInfo({ firstName, lastName, email, phone, nic }));
    history.push(`/carBooking/${id}/process/payment`, {
      state: {
        startDestination,
        endDestination,
        pickupTime,
        dropoffTime,
        dates,
        totalPrice,
      },
    });
  };
  return (
    <>
      <MetaData title={`Sayahat: Payment`} />
      <Grid container>
        <Grid lg={6} style={{ padding: "78px 0px"}}>
          <CarCheckoutSteps activeStep={0} />
          <div className="container text-center mt-5">
            <h4 style={{ color: "black" }} className="my-3">
              We'll use this information to send you confirmation and updates
              about your booking
            </h4>
            {!localStorage.token && (
              <h5 style={{ color: "black" }} className="mt-3">
                Already have an account?
                <span>
                  <Link to="/login">Log in</Link>
                </span>
              </h5>
            )}
            <form
              encType="multipart/form-data"
              onSubmit={SubmitContactInfo}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="my-3 inputField">
                <TextField
                  autoComplete="off"
                  type="number"
                  fullWidth
                  required
                  id="outlined-required"
                  label="CNIC"
                  // max="13"
                  // pattern="^\d{5}-\d{8}-\d{1}$"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
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

              {/* <input
                type="submit"
                value="Continue"
                className="shippingBtn"
                // disabled={state ? false : true}
              /> */}
              {active === 0 && (
                <Button
                  variant="contained"
                  type="submit"
                  style={{ float: "right" }}
                  className="send-button"
                  disabled={!firstName || !lastName || !email || !phone || !nic}
                  // onClick={handleShow}
                >
                  Next
                </Button>
              )}
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
                src={ImageUrl(car.carImages && car.carImages[0].img)}
                alt=""
              />
              <b>{car.name}</b>
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
            <span>
              From <span>{startDestination}</span>
            </span>
            <span>
              To: <span>{endDestination}</span>
            </span>

            {/* <span>
              Pick-up Time: <span className="siTaxiOp">{pickupTime}</span>
            </span>
            <span>
              Drop-off Time: <span className="siTaxiOp">{dropoffTime}</span>
            </span> */}

            <span>
              Pick-up & Drop-off:{" "}
              <span >{`${dates[0].startDate}`.substring(0,11)} {`${pickupTime} - ${dates[0].endDate}`.substring(0,19)} {`${dropoffTime}`}</span>
            </span>
            {/* <span>{car.payAt}</span>
            <span>{car.refund}</span> */}
            <hr />
          </div>
          {/* <div
            style={{
              marginLeft: "36px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <b>Total Price</b>
            <b>PKR {totalPrice}</b>
          </div> */}
          <div
            style={{
              marginLeft: "36px",
            }}
          >
            <h5 style={{fontWeight:"bolder"}}>Price details</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              marginTop:'20px'

              }}
            >
              <span>
              {/* {`${car.price} x ${days}`} */}
             {`Car rental fee x  ${days} ${days > 1 ? 'days':'day'}`}
              </span>
              <span>PKR {totalPrice}</span>
            </div>
            <span style={{ fontSize: "small" }}>
              PKR {car.fare}  per day
            </span>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
              marginTop:'20px'
              }}>
              <span>Taxes</span>
              <span>PKR 0</span>
            </div>
          </div>

          <div
            style={{
              marginLeft: "36px",
              display: "flex",
              justifyContent: "space-between",
              marginTop:'20px',
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

export default CarContactDetails;
