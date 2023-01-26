import { TextField, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MetaData from "../../../Components/MetaData/MetaData";
import { getPackageDetailById } from "../../../Redux/Actions/packageAction";
import { ImageUrl } from "../../../Redux/UrlConfig";
import CheckoutSteps from "../CheckoutSteps";

const ActivityDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [time, setTimes] = useState(location.state.state.time);
  const [active, setActive] = useState(1);
  const packages = useSelector((state) => state.addPackageReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);
  const createProductSubmitHandler = (e) => {
    const data = {
      firstName,
      lastName,
      dates,
      time,
      options,
    };

    sessionStorage.setItem("activityInfo", JSON.stringify(data));
    history.push(`/package/${id}/process/payment`, {
      state: { time },
    });
  };
  if (Object.keys(packages.package).length === 0) {
    return null;
  }
  return (
    <>
      <MetaData title={`Sayahat: Payment`} />
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
            <span className="siTaxiOp mb-1">
              Adults {options.adult} Children {options.children}
            </span>
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

              {active === 1 && (
                <Button
                  variant="contained"
                  type="submit"
                  style={{ float: "right" }}
                  className="send-button"
                  disabled={!firstName || !lastName}
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
