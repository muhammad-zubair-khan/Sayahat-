import React, { useEffect, useState } from "react";
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
  Slider,
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
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch ,useSelector} from "react-redux";
import { getAllCars } from "../../../Redux/Actions/carAction";

const CarList = () => {
  const location = useLocation();
  const dispatch = useDispatch()
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
  const [type, setType] = useState("");
  const [gear, setGear] = useState("");
  const [ratings, setRatings] = useState(0);
  const { cars } = useSelector((state) => state.carsReducer);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:5000/api/cars?city=${startDestination}&min=${
  //     min || 0
  //   }&max=${max || 99999}`
  // );

  // const handleClick = () => {
  //   reFetch();
  // };
const types = [
  "SUV",
  "Van",
  "Mercedes",
  "Mini-Van",
];
const gears = [
  "Automatic",
  "Manual"
];

  useEffect(() => {
    dispatch(getAllCars(min,max,type,ratings,startDestination,gear))
  }, [dispatch,min,max,type,ratings,startDestination,gear])
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Button variant="primary" onClick={handleShow}>
            <i class="fa-solid fa-bars me-2 fs-3"></i>{" "}
            <span className="fs-3">Filters</span>
          </Button>
          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="col-12">
                <div
                  className="lsItem p-3"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <label>From</label>
                  <input
                    placeholder={location.state.state.startDestination}
                    onChange={(e) => setStartDestination(e.target.value)}
                    type="text"
                  />
                </div>
                <div
                  className="lsItem p-3"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <label>To</label>
                  <input
                    placeholder={location.state.state.endDestination}
                    onChange={(e) => setEndDestination(e.target.value)}
                    type="text"
                  />
                </div>
                <div
                  className="lsItem p-3"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <label for="from">Pick-up Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
                <div
                  className="lsItem p-3"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <label for="from">Drop-off Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                  />
                </div>

                <div
                  className="p-3 IsItem"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <p style={{ color: "white", fontSize: "small" }}>
                    Check-in Date
                  </p>
                  <span
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setOpenCarDate(!openCarDate)}
                  >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openCarDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      ranges={dates}
                      minDate={new Date()}
                    />
                  )}
                </div>

                <div className="p-4" style={{ backgroundColor: "#186B6D" }}>
                  <div className="lsOptionItem" >
                    <span className="lsOptionText"  style={{ color: "white" }}>
                      Min price
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText" style={{ color: "white" }}>
                      Max price
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                </div>

                <div className="p-4">
                      <fieldset>
                        <Typography component="legend">
                          Ratings Above
                        </Typography>
                        <Slider
                          value={ratings}
                          onChange={(e, newRating) => {
                            setRatings(newRating);
                          }}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          default={cars.map((item) => {
                            return item.ratings;
                          })}
                          min={0}
                          max={5}
                        />
                      </fieldset>
                    </div>

                    <div className="px-4">
                      <p className="fw-bold text-dark">Types</p>
                      <ul className="list-group">
                        {types.map((type) => {
                          return (
                            <>
                              <li className="list-group-item border-0" style={{cursor:'pointer'}} key={type} 
                                onClick={(e) => setType(type)}
                              >
                                 {type}
                              </li>
                            </>
                          );
                        })}
                     
                      </ul>
                    </div>

                    <div className="px-4">
                      <p className="fw-bold text-dark mt-4">Gear</p>
                      <ul className="list-group">
                        {gears.map((gear) => {
                          return (
                            <>
                              <li className="list-group-item border-0" style={{cursor:'pointer'}} key={gear} 
                                onClick={(e) => setGear(gear)}
                              >
                                 {gear}
                              </li>
                            </>
                          );
                        })}
                     
                      </ul>
                    </div>

                {/* <div className="p-4">
                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    default={packages.map((item) => {
                      return item.ratings;
                    })}
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div> */}

                {/* <div className="px-4">
                <p className="fw-bold text-dark">Duration</p>
                <ul class="list-group">
                  {packages.map((item) => {
                    return (
                      <>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              {item.duration}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
               
                </ul>
              </div> */}

                {/* <div className="p-4">
                <p className="fw-bold text-dark">Time of Day</p>
                <ul class="list-group">
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        6am—12pm
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        12pm—5pm
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        5pm—12am
                      </label>
                    </div>
                  </li>
                </ul>
              </div> */}

                {/* <div className="p-4">
                <p className="fw-bold text-dark">Specials</p>
                <ul class="list-group">
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Deals & Discounts
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Free Cancellation
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Likely to Sell Out
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Skip-The-Line
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item border-0">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Private Tour
                      </label>
                    </div>
                  </li>
                </ul>
              </div> */}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          {/* <div className="listSearch">
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

          </div> */}
        </Grid>

        {/* {loading ? (
          "loading"
        ) : ( */}
          <Grid
            container
            lg={9}
            style={{
              height: "fit-content",
              // border: "1px solid #f1e1e1",
              padding: "18px 18px",
            }}
          >
            {cars &&
              cars.map((item) => (
                <CarSearchItem item={item} key={item._id} />
              ))}
          </Grid>
        {/* )} */}
        {/* </div> */}
      </Grid>
    </>
  );
};

export default CarList;
