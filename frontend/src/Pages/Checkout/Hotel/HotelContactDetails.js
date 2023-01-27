import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CheckoutSteps from "../CheckoutSteps";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveContactInfo,
  saveHotelContactInfo,
} from "../../../Redux/Actions/checkout";
import { Button, Grid } from "@mui/material";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import useFetch from "../../../hook/useFetch";
import { getHotelDetailById } from "../../../Redux/Actions/hotelAction";
import MetaData from "../../../Components/MetaData/MetaData";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AiOutlineInfoCircle } from "react-icons/ai";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
  const [selectedRooms, setSelectedRooms] = useState(
    location.state.state.selectedRooms
  );

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

  const [active, setActive] = useState(0);
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
      state: { destination, dates, options, totalPrice, selectedRooms },
    });
  };
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  if (Object.keys(hotel).length === 0) {
    return null;
  }
  return (
    <>
      <MetaData title={`Sayahat: Payment`} />
      <Grid container>
        <Grid lg={6} style={{ padding: "78px 0px"}}>
          <CheckoutSteps activeStep={0} />
          <div className="container text-center mt-5">
            <h4 style={{ color: "black" }} className="my-3">
              We'll use this information to send you confirmation and updates
              about your booking
            </h4>
            {!localStorage.token && <h5 style={{ color: "black" }} className="mt-3">
              Already have an account?
              <span>
                <Link to="/login">Log in</Link>
              </span>
            </h5>}
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
                  disabled={!firstName || !lastName || !email || !phone}
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
              position: "relative",
            }}
          >
            <span>
              <img
                src={ImageUrl(hotel.hotelImages[0].img)}
                style={{ width: "70%", filter: "brightness(0.5)" }}
                alt="hotel img"
              />
              <p
                style={{
                  position: "absolute",
                  top: "152px",
                  color: "white",
                  padding: "10px",
                }}
              >
                {hotel.name}
              </p>
            </span>
          </div>
          <div style={{ marginTop: "1em", marginLeft: "36px" }}>
            <span>
              {`${hotel.ratings}/10 ${
                hotel.ratings <= 5 ? "Good" : "Excellent"
              } (${hotel.numOfReviews} ${
                hotel.numOfReviews > 1 ? "reviews" : "review"
              })`}
            </span>
          </div>
          <div
            style={{
              fontSize: ".8666666666666667em",
              marginTop: " 0.46153846em",
              marginLeft: "36px",
            }}
          >
            <span>Guests rated this property 9.2/10 for cleanliness</span>
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
            <span>{` ${selectedRooms.length} ${
              selectedRooms.length > 1 ? "Rooms" : "Room"
            } : Room No ${selectedRooms}, ${
              data.list && data.list.map((data) => data.desc)
            }`}</span>
            <span
              style={{ color: "red", display: "flex", alignItems: "center" }}
            >
              {hotel.FullyRefundable === "Yes"
                ? "refundable"
                : "non-refundable"}
              <HtmlTooltip
                title={
                  <React.Fragment>
                    {hotel.FullyRefundable === "Yes"
                      ? "If you change or cancel your booking you will get a refund or credit to use for a future stay."
                      : "If you change or cancel your booking you will not get a refund or credit to use for a future stay. "}
                  </React.Fragment>
                }
              >
                <Button style={{ color: "red", background: "none" }}>
                  <AiOutlineInfoCircle />
                </Button>
              </HtmlTooltip>
            </span>
            <span> Check-in: {`${dates[0].startDate}`.substring(0, 10)}</span>
            <span> Check-out: {`${dates[0].endDate}`.substring(0, 10)}</span>
            <span>
              {options.adult + options.children}{" "}
              {options.adult + options.children > 1 ? "Persons" : "Person"}
            </span>
            <span>{`${days}-night stay`}</span>
            <hr />
          </div>
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
                {`${selectedRooms.length} ${
                  selectedRooms.lengt > 1 ? "rooms" : "room"
                } x ${days} ${days > 1 ? "nights" : "night"} `}
              </span>
              <span>PKR {totalPrice}</span>
            </div>
            <span style={{ fontSize: "small" }}>
              PKR {hotel.cheapestPrice} average per night
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

export default HotelContactDetails;
