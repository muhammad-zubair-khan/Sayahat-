import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CheckoutSteps from "../CheckoutSteps";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveContactInfo } from "../../../Redux/Actions/checkout";
import { Button, Grid } from "@mui/material";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import MetaData from "../../../Components/MetaData/MetaData";

const ContactDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [time, setTimes] = useState(location.state.state.time);

  const packages = useSelector((state) => state.addPackageReducer);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);
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
    dispatch(saveContactInfo({ firstName, lastName, email, phone }));
    history.push(`/package/${id}/activitydetails`, {
      state: { time, dates, options },
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
      <MetaData title={`Sayahat: Payment`} />
      <Grid container style={{ margin: "106px 43px" }}>
        <Grid lg={7}>
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
                  disabled={!firstName || !lastName || !email || !phone}
                  // onClick={handleShow}
                >
                  Next
                </Button>
              )}
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
            <span>{packages.package.title}</span>
            <hr />
          </div>
          <div>
            <b>Pick-up Time: {time}</b>
          </div>
          <div>
            <b>Date: {dates}</b>
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
