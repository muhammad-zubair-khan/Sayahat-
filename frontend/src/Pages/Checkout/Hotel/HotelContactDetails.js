import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CheckoutSteps from "../CheckoutSteps";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveContactInfo, saveHotelContactInfo } from "../../../Redux/Actions/checkout";
import { Button, Grid } from "@mui/material";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import useFetch from "../../../hook/useFetch";
import { getHotelDetailById } from "../../../Redux/Actions/hotelAction";
import MetaData from "../../../Components/MetaData/MetaData";

const HotelContactDetails = () => {
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
  }, [id]);

  const handleClose = () => {
    setShow(false);
    // navigate(0);
  };
  const handleShow = () => {
    if (!isEmail(email)) {
      setShow(false);
    } else if (isEmail(email)) {
      setShow(true);
    }
  };
  const history = useHistory();
  const isEmail = (email) =>
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
      email
    );

    const [active,setActive]= useState(0)
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState("");

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
    dispatch(saveHotelContactInfo({ firstName, lastName, email, phone }));
    history.push(`/hotel/${id}/hotelactivityDetail`, {
      state: { destination, dates, options, totalPrice,selectedRooms },
    });
  };
  // const setEmail = (e) => {
  //   setValues((values) => ({ ...values, email: e.target.value }));
  // };
  if (Object.keys(hotel).length === 0) {
    return null;
  }
  return (
    <>
    <MetaData title={`Sayahat: Payment`}/>
      <Grid container style={{ margin: "106px 43px" }}>
        <Grid lg={6}>
          <CheckoutSteps activeStep={0} />
          <div className="container text-center mt-5">
            <h4 style={{ color: "black" }} className="my-3">
              We'll use this information to send you confirmation and updates
              about your booking
            </h4>
            <h5 style={{ color: "black" }} className="mt-3">
              Already have an account?
              <span>
                <Link to="/login">Log in</Link>
              </span>
            </h5>
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
              
              {active === 0 && (
                      <Button
                        variant="contained"
                        type="submit"
                        style={{ float: "right" }}
                        className="send-button"
                        disabled={
                          !firstName || !lastName || !email || !phone
                        }
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

export default HotelContactDetails;
