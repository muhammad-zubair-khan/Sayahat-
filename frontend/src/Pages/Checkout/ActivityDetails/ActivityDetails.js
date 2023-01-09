import { TextField, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import CheckoutSteps from "../CheckoutSteps";
import { format } from "date-fns";

const ActivityDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [time, setTimes] = useState(location.state.state.time);
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
  const createProductSubmitHandler = (e) => {
    // e.preventDefault();
    // const myForm = new FormData();

    // myForm.set("firstName", firstName);

    // myForm.set("lastName", lastName);
    const data = {
      firstName,
      lastName,
      dates,time,options
    };

    sessionStorage.setItem("activityInfo", JSON.stringify(data));
    // dispatch(saveActivityInfo({ firstName, lastName }));
    history.push(`/package/${id}/process/payment`, {
      state: { time },
    });
    // axios
    //   .post("http://localhost:5000/api/contact/add", myForm)
    //   .then(function (response) {
    //     console.log(response);
    //   });
  };
  if (Object.keys(packages.package).length === 0) {
    return null;
  }
  return (
    <>
      <Grid container style={{ margin: "106px 43px" }}>
        <Grid lg={7}>
          <CheckoutSteps activeStep={1} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
              display: "flex",
              flexDirection: "column",
              margin: "14px 19px",
            }}
          >
                  <b>Date: {dates}</b>

            {/* <span className="siTaxiOp mb-1">Dates {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span> */}
            <span className="siTaxiOp mb-1">Adults {options.adult} Children {options.children}</span>
            <span className="siTaxiOp mb-1">Pickup Time {time}</span>
            <span>{packages.package.carPickupDetails}</span>

            <p style={{ marginTop: "10px" }}>
              Total Price: <span>PKR {packages.package.price}</span>{" "}
            </p>
          </div>

          <div className="container mt-2">
            <b>Adult 1</b>
            <form
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
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
          <div>{/* <b>Pick-up Time: {time}</b> */}</div>
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

export default ActivityDetails;
