import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CheckoutSteps from '../CheckoutSteps'
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveContactInfo } from "../../../Redux/Actions/checkout";
import { Grid } from "@mui/material";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";

const ContactDetails = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth)
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
    const [time,setTimes] = useState(location.state.state.time)
    const [show, setShow] = useState(false);

  const packages = useSelector((state) => state.addPackageReducer);
    const { id } = useParams();
    // const { data, loading, error } = useFetch(
    //   `http://localhost:5000/api/hotel/${id}`
    // );
    // console.log(data);
    useEffect(() => {
        dispatch(getPackageDetailById(id));
      }, [dispatch, id]);

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
    dispatch(
      saveContactInfo({ firstName, lastName,email, phone })
    );
    history.push(`/package/${id}/activitydetails`, {
      state: { time,dates,options },
    });
    
  };
  // const setEmail = (e) => {
  //   setValues((values) => ({ ...values, email: e.target.value }));
  // };
  if (Object.keys(packages.package).length === 0) {
    return null;
  }
  return (
    <>
      <Grid container style={{ margin: "106px 43px" }}>
          <Grid lg={7}>

       
    <CheckoutSteps activeStep={0} />
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
            onChange={(e)=>setEmail(e.target.value)}
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
            lg={5}
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
                  src={ImageUrl(packages.package.packageImages[0].img)}
                  style={{ width: "30%" }}
                  alt=""
                />
                <b>{packages.package.name}</b>
              </span>
              <span>
                <b>PKR {packages.package.price}</b>
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
              {/* <span>Pick-up Time: <span className="siTaxiOp">{pickupTime}</span></span>
                <span>Drop-off Time: <span className="siTaxiOp">{dropoffTime}</span></span> */}
              {/* <span>{data.hotel.address}</span> */}
              <span>{packages.package.title}</span>
              <hr />
            </div>
            <div>
            <b>Pick-up Time: {time}</b>
            </div>
            <div
              style={{
                // marginLeft: "36px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <b>Total Price</b>
              <b>PKR {packages.package.price}</b>
            </div>
          </Grid>
      </Grid>
    </>

  );
};

export default ContactDetails;
