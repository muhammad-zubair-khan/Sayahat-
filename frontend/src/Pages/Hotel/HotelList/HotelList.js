import React, { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { DateRange, DateRangePicker } from "react-date-range";
import SearchItem from "../../../Components/searchItem/SearchItem";
import useFetch from "../../../hook/useFetch";
import "./HotelList.css";
import {
  getAllHotels,
  // getHotelBySlug,
} from "../../../Redux/Actions/hotelAction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Slider, Typography } from "@mui/material";
const HotelList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const { hotels } = useSelector((state) => state.hotelReducer);
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [type, setType] = useState("");
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    dispatch(getAllHotels(type, min, max, ratings,destination));
  }, [dispatch, type, min, max, ratings,destination]);

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:5000/api/all-hotels?city=${destination}&min=${
  //     min || 0
  //   }&max=${max || 99999}`
  // );

  // const handleClick = () => {
  //   reFetch();
  // };
  const types = [
    "Hotel",
    "Appartment",
    "Villa",
    "Studio",
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row container className="mt-5">
        {/* <Col md={6} lg={4}>
          <div className="listSearch">
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={location.state.state.destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                  />
                  )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={location.state.state.options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={location.state.state.options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={location.state.state.options.room}
                  />
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
          </div>
        </Col> */}
        <div className="col-md-4">
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
                  className="lsItem p-4"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <label>Destination</label>
                  <input
                    placeholder={location.state.state.destination}
                    onChange={(e) => setDestination(e.target.value)}
                    type="text"
                  />
                </div>

                <div
                  className="p-4 IsItem"
                  style={{ backgroundColor: "#186B6D" }}
                >
                  <p style={{ color: "white", fontSize: "small" }}>
                    Check-in Date
                  </p>
                  <span
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => setOpenDate(!openDate)}
                  >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      ranges={dates}
                      minDate={new Date()}
                    />
                  )}
                </div>

                {/* <div className="p-4">
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
                          default={packages.map((item) => {
                            return item.ratings;
                          })}
                          min={0}
                          max={5}
                        />
                      </fieldset>
                    </div> */}

                <div className="p-4">
                  <label>Options</label>
                  <div className="lsOptions">
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Min price <small>per night</small>
                      </span>
                      <input
                        type="number"
                        onChange={(e) => setMin(e.target.value)}
                        className="lsOptionInput"
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">
                        Max price <small>per night</small>
                      </span>
                      <input
                        type="number"
                        onChange={(e) => setMax(e.target.value)}
                        className="lsOptionInput"
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Adult</span>
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={location.state.state.options.adult}
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Children</span>
                      <input
                        type="number"
                        min={0}
                        className="lsOptionInput"
                        placeholder={location.state.state.options.children}
                      />
                    </div>
                    <div className="lsOptionItem">
                      <span className="lsOptionText">Room</span>
                      <input
                        type="number"
                        min={1}
                        className="lsOptionInput"
                        placeholder={location.state.state.options.room}
                      />
                    </div>
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
                          default={hotels.map((item) => {
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

                <div className="p-4">
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
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <Col md={6} lg={8}>
          {/* <div className="listResult"> */}
          {/* {loading ? (
            "loading"
          ) : (
            <> */}
          {hotels &&
            hotels.map((item) => <SearchItem item={item} key={item._id} />)}
          {/* </>
          )} */}
          {/* </div> */}
        </Col>
      </Row>

      {/* </div>
      </div> */}
    </>
  );
};

export default HotelList;
