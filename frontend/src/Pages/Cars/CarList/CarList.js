import React, { useState } from "react";
import "./CarList.css";
import { Link, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import useFetch from "../../../hook/useFetch";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import CarSearchItem from "../../../Components/CarSearchItem/CarSearchItem.js";

const CarList = () => {
  const location = useLocation();
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [openCarDate, setOpenCarDate] = useState(false);
  const [dates, setDates] = useState(location.state.state.dates);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(
    location.state.state.dropoffTime
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/api/cars?city=${startDestination}&min=${min || 0}&max=${
      max || 99999
    }`
  );
  console.log("carsByFare", data);
  console.log("location.....", location);
  const handleClick = () => {
    reFetch();
  };
  console.log("startDestination>>",startDestination)
  console.log("endDestination>>",endDestination)
  console.log("dates>>",dates)
  console.log("pickupTime>>",pickupTime)
  console.log("dropoffTime>>",dropoffTime)
  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={4}
          style={{ textAlign: "center", margin: "auto" }}
        >
          <img
            className="img-fluid"
            src="https://mediaim.expedia.com/cars/19/7b8cf277-4ee5-46f4-b8fe-ac19c0f41d69.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165"
            alt="SUV "
          ></img>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6">Midsize SUV</Typography>
          <span className="small-span">Kia Sportage or similar</span>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="5" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Unlimited mileage" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary="Enhanced cleaning" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AirplaneTicketIcon />
              </ListItemIcon>
              <ListItemText primary="Shuttle to counter and car" />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} lg={4} style={{ textAlign: "end" }}>
          <Typography
            variant="h5"
            style={{ color: "black", fontWeight: "bolder" }}
          >
            68$
          </Typography>
          <h6 paragraph>per day</h6>
          <h6 paragraph>$95 total</h6>
          <Button variant="contained">
            <Link to="/car/:id" style={{ color: "white" }}>
              Continue
            </Link>
          </Button>
        </Grid>
      </Grid> */}
      <Grid container>
        <Grid item xs={12} lg={3}>
          <div className="listSearch">
            {/* <h1 className="lsTitle">Search</h1> */}
            <div className="lsItem">
              <label>From</label>
              <input
                placeholder={location.state.state.startDestination}
                onChange={(e) => setStartDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>To</label>
              <input
                placeholder={location.state.state.endDestination}
                onChange={(e) => setEndDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label for="from">Pick-up Time</label>
              <input
                type="time"
                className="form-control"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label for="from">Drop-off Time</label>
              <input
                type="time"
                className="form-control"
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenCarDate(!openCarDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openCarDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            {/* <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price</span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price</span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

              </div>
              <button onClick={handleClick}>Search</button>
            </div> */}
          </div>
        </Grid>

        {/* <div className="listResult"> */}
        {loading ? (
          "loading"
        ) : (
          <Grid container
          lg={9}
          style={{
            height: "fit-content",
            border: "1px solid #f1e1e1",
            padding: "18px 18px",
          }}>
            {data.cars &&
              data.cars.map((item) => <CarSearchItem item={item} key={item._id} />)}
          </Grid>
        )}
        {/* </div> */}
      </Grid>
    </>
  );
};

export default CarList;
