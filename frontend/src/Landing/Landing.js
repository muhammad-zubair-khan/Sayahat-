import React, { useState, useContext } from "react";
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./Landing.css";
import MyCard from "../MyCard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import videoplayback from "../Assets/videoplayback.mp4";
import ReactPlayer from "react-player";
import CardSlider from "../CardSlider";
import "../CardSlider.css";
import { TopDes } from "../TopDes";
import Footer from "../Footer/Footer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../Redux/Actions/hotelAction";
import { SearchContext } from "../Context/SearchContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { getAllVacationProduct } from "../Redux/Actions/vacationProductAction";
import VillaIcon from "@mui/icons-material/Villa";
const Landing = ({ type }) => {
  const history = useHistory();
  //Stays
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  //Car
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [openCarDate, setOpenCarDate] = useState(false);
  const [pickupTime, setPickupTime] = useState(null);
  const [dropoffTime, setDropoffTime] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options3, setOptions3] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  //Hotel
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increament" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //Package
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [packageDate, setPackageDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //package
  const [packageDestination, setPackageDestination] = useState("");
  const [openOptions2, setOpenOptions2] = useState(false);
  const [options2, setOptions2] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  //Package
  const handleOption2 = (name, operation) => {
    setOptions2((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increament" ? options2[name] + 1 : options2[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    history.push("/hotels", { state: { destination, dates, options } });
  };
  const handlePackageSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { packageDestination, dates, options },
    });
    history.push("/packages", {
      state: { packageDestination, dates, options },
    });
  };
  const handleCarSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        startDestination,
        endDestination,
        pickupTime,
        dropoffTime,
        dates,
        options,
      },
    });
    history.push(
      `/cars?from=${startDestination}&to=${endDestination}&pickup-Time=${pickupTime}&dropoff-time=${dropoffTime}`,
      {
        state: {
          startDestination,
          endDestination,
          pickupTime,
          dropoffTime,
          dates,
        },
      }
    );
  };
  const { products } = useSelector((state) => state.vacationProduct);
  useEffect(() => {
    dispatch(getAllVacationProduct());
  }, []);

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results)
  // }

  //Car Functions
  const CarhandleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const CarhandleOnSelect = (product) => {
    // the item selected
    setStartDestination(product.name);
    // console.log(product);
  };
  const CarEndhandleOnSelect = (product) => {
    // the item selected
    setEndDestination(product.name);
    console.log(product);
  };

  const CarhandleOnFocus = () => {
    console.log("Focused");
  };

  const CarformatResult = (product) => {
    return (
      <>
        <span style={{ textAlign: "left", display: "none" }}>
          id: {product._id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          {product.name}
        </span>
      </>
    );
  };

  //Stays Function
  const handleOnStayHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnStaySelect = (product) => {
    setDestination(product.name);
  };

  //Package Functions
  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (product) => {
    setPackageDestination(product.name);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (product) => {
    return (
      <>
        <span style={{ textAlign: "left", display: "none" }}>
          id: {product._id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          {product.name}
        </span>
      </>
    );
  };

  return (
    <>
      <div className="fh5co-hero">
        <div className="fh5co-overlay"></div>
        <div className="fh5co-cover" data-stellar-background-ratio="0.5">
          <div className="desc">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="tabulation animate-box">
                    {/* <!-- Nav tabs --> */}
                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation">
                        <a
                          href="#cars"
                          aria-controls="cars"
                          role="tab"
                          data-toggle="tab"
                          className="active tab-menu"
                        >
                          Cars
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          href="#stays"
                          aria-controls="stays"
                          role="tab"
                          data-toggle="tab"
                          className="tab-menu"
                        >
                          Stays
                        </a>
                      </li>
                      <li role="presentation">
                        <a
                          href="#packages"
                          aria-controls="packages"
                          role="tab"
                          data-toggle="tab"
                          className="tab-menu"
                        >
                          Packages
                        </a>
                      </li>
                    </ul>

                    {/* <!-- Tab panes --> */}
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="cars"
                      >
                        <div className="row">
                          <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="from">From:</label>
                              {/* <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
                                onChange={(e) =>
                                  setStartDestination(e.target.value)
                                }
                              /> */}
                              <ReactSearchAutocomplete
                                items={products}
                                // onSearch={handleOnSearch}
                                onHover={CarhandleOnHover}
                                onSelect={CarhandleOnSelect}
                                // onFocus={handleOnFocus}
                                autoFocus
                                formatResult={CarformatResult}
                                value={startDestination}
                                onChange={(e) =>
                                  setStartDestination(e.target.value)
                                }
                                placeholder="Lahore, PK"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="from">To:</label>
                              {/* <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Islamabad, PK"
                                onChange={(e) =>
                                  setEndDestination(e.target.value)
                                }
                              /> */}
                              <ReactSearchAutocomplete
                                items={products}
                                // onSearch={handleOnSearch}
                                onHover={CarhandleOnHover}
                                onSelect={CarEndhandleOnSelect}
                                // onFocus={handleOnFocus}
                                autoFocus
                                formatResult={CarformatResult}
                                value={endDestination}
                                onChange={(e) =>
                                  setEndDestination(e.target.value)
                                }
                                placeholder="Islamabad, PK"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="from">Pick-up Time</label>
                              <input
                                style={{
                                  backgroundColor: "#d3d4d6",
                                  minHeight: "44px",
                                  borderRadius:0,
                                }}
                                type="time"
                                className="form-control"
                                onChange={(e) => setPickupTime(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="from">Drop-off Time</label>
                              <input
                                style={{
                                  backgroundColor: "#d3d4d6",
                                  minHeight: "44px",
                                  borderRadius:0
                                }}
                                type="time"
                                className="form-control"
                                onChange={(e) => setDropoffTime(e.target.value)}
                                placeholder="select pickup time"
                                required
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt"
                              style={{
                                margin: "15px 0px",
                                width: "fit-content",
                              }}
                            >
                              <div className="input-field search-item">
                                <CalendarMonthIcon style={{ color: "white" }} />
                                <span
                                  style={{
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontSize: "14px",
                                  }}
                                  onClick={() => setOpenCarDate(!openCarDate)}
                                >
                                  {`${format(
                                    dates[0].startDate,
                                    "MM/dd/yyyy"
                                  )} to ${format(
                                    dates[0].endDate,
                                    "MM/dd/yyyy"
                                  )}`}
                                </span>
                                {openCarDate && (
                                  <DateRangePicker
                                    editableDateInputs={true}
                                    ranges={dates}
                                    moveRangeOnFirstSelection={false}
                                    onChange={(item) =>
                                      setDates([item.selection])
                                    }
                                    className="date"
                                    minDate={new Date()}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="col-xxs-12 col-xs-6 col-md-9 col-lg-9" style={{textAlign:'end'}}>
                              <Button
                                style={{
                                  backgroundColor: "#f78536",
                                }}
                                variant="contained"
                                onClick={handleCarSearch}
                              >
                                Search Car
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="stays">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 col-md-4 col-lg-4  mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <div>
                                <ReactSearchAutocomplete
                                  items={products}
                                  // onSearch={handleOnSearch}
                                  onHover={handleOnStayHover}
                                  onSelect={handleOnStaySelect}
                                  // onFocus={handleOnFocus}
                                  autoFocus
                                  formatResult={formatResult}
                                  onChange={(e) =>
                                    setDestination(e.target.value)
                                  }
                                  placeholder="Lahore, PK"
                                />
                              </div>
                              {/* <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
                                onChange={(e) => setDestination(e.target.value)}
                              /> */}
                            </div>
                          </div>

                          <div className="col-xxs-12 col-xs-12 col-md-4 col-lg-4 mt alternate" style={{textAlign:' center'}}>
                            <div className="input-field search-item" style={{top: '31px'}}>
                              <CalendarMonthIcon style={{ color: "white" }} />
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",

                                  fontSize: "14px",
                                }}
                                onClick={() => setOpenDate(!openDate)}
                              >
                                {`${format(
                                  dates[0].startDate,
                                  "MM/dd/yyyy"
                                )} to ${format(
                                  dates[0].endDate,
                                  "MM/dd/yyyy"
                                )}`}
                              </span>
                              {openDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  onChange={(item) =>
                                    setDates([item.selection])
                                  }
                                  moveRangeOnFirstSelection={false}
                                  ranges={dates}
                                  className="date"
                                  minDate={new Date()}
                                />
                              )}
                            </div>
                          </div>
                          <div className=" col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt" style={{textAlign:' center'}}>
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",
                                  position: 'relative',
                                  top: '29px',
                                  fontSize: "14px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setOpenOptions(!openOptions)}
                              >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                              {openOptions && (
                                <div className="options">
                                  <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Adult
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        disabled={options.adult <= 1}
                                        onClick={() =>
                                          handleOption("adult", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.adult}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "1px" }}
                                        onClick={() =>
                                          handleOption("adult", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Children
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        disabled={options.children <= 0}
                                        onClick={() =>
                                          handleOption("children", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.children}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption("children", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Room
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "3px" }}
                                        disabled={options.room <= 1}
                                        onClick={() =>
                                          handleOption("room", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.room}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption("room", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>

                          <div className="col-xs-12 mt">
                            <Button
                              onClick={handleSearch}
                              variant="contained"
                              style={{
                                backgroundColor: "#f78536",
                              }}
                            >
                              Search Hotels
                            </Button>
                          </div>
                        </div>
                      </div>
                      {/* /////////////////////////////////////////////////////////////// */}
                      <div role="tabpanel" className="tab-pane" id="packages">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 col-md-4 col-lg-4 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <div>
                                <ReactSearchAutocomplete
                                  items={products}
                                  // // onSearch={handleOnSearch}
                                  // onHover={handleOnHover}
                                  onSelect={handleOnSelect}
                                  // // onFocus={handleOnFocus}
                                  // autoFocus
                                  // formatResult={formatResult}
                                  // onChange={(e) =>
                                  //   setPackageDestination(e.target.value)
                                  // }
                                  value={packageDestination}
                                  onChange={(e) =>
                                    setPackageDestination(e.target.value)
                                  }
                                  placeholder="Lahore, PK"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt alternate">
                            <div className="input-field search-item" style={{top: '31px ',textAlign:'center'}}>
                              <CalendarMonthIcon style={{ color: "white" }} />
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",

                                  fontSize: "14px",
                                }}
                                onClick={() =>
                                  setOpenPackageDate(!openPackageDate)
                                }
                              >
                                {`${format(
                                  dates[0].startDate,
                                  "MM/dd/yyyy"
                                )} to ${format(
                                  dates[0].endDate,
                                  "MM/dd/yyyy"
                                )}`}
                              </span>
                              {openPackageDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  ranges={dates}
                                  moveRangeOnFirstSelection={false}
                                  onChange={(item) =>
                                    setDates([item.selection])
                                  }
                                  className="date"
                                />
                              )}
                            </div>
                          </div>
                          <div className=" col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt" style={{textAlign:'center'}}>
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",
                                  position: 'relative',
                                  top: '29px',
                                  fontSize: "14px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setOpenOptions(!openOptions)}
                              >{`${options.adult} Adult - ${options.children} Children`}</span>
                              {openOptions && (
                                <div className="options2">
                                  <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Adult
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        disabled={options.adult <= 1}
                                        onClick={() =>
                                          handleOption("adult", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.adult}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "1px" }}
                                        onClick={() =>
                                          handleOption("adult", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Children
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        disabled={options.children <= 0}
                                        onClick={() =>
                                          handleOption("children", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.children}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption("children", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  {/* <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Room
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "3px" }}
                                        disabled={options.room <= 1}
                                        onClick={() =>
                                          handleOption("room", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.room}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption("room", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div> */}
                                </div>
                              )}
                          </div>
                          <div className="col-xs-12">
                            <Button
                              onClick={handlePackageSearch}
                              variant="contained"
                              style={{
                                backgroundColor: "#f78536",
                              }}
                             
                            >Search Packages</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="desc2 animate-box col-md-7 col-sm-12 col-lg-7">
                  <div>
                    <h2>
                      Be a Traveler not a <br /> Tourist
                    </h2>
                    <span style={{ color: "#c3bfbf" }}>
                      Travel to the any corner of the world, without going
                      around in circles
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------Special Offers & Discount----------------------------- */}
      <div
        className="tours"
        style={{
          backgroundColor: "black",
          marginTop: "0",
          border: "1px solid",
          paddingBottom: "60px",
        }}
      >
        <Container className="mt-5 mb-3">
          <h3 style={{ color: "white" }}>
            <VillaIcon /> Tour Packages
          </h3>
        </Container>

        {/* ---------------CARDS----START */}
        <MyCard />
        {/* ---------------CARDS----END */}
        <Container>
          {/* -----ABOUT-US-START----------- */}
          <Grid container className="mt-5">
            <Grid xs={12} lg={6} className="mt-3">
              <Box style={{ textAlign: "center", padding: "52px 04px" }}>
                <h3 style={{ color: "white" }}>
                  What You Know About Pakistan?
                </h3>
                <p
                  style={{
                    textAlign: "justify",
                    marginTop: "10px",
                    color: "#dddddd",
                  }}
                >
                  Pakistan is one of the most fascinating nations you might
                  travel to, with a vibrant culture, a sizable population, and a
                  fascinatingly wide range of natural magnificence. Here are
                  some of Pakistan's most distinctive features, all of which
                  enrich and beautify the world. Pakistan, officially the
                  Islamic Republic of Pakistan, is a country in South Asia. It
                  is the world's fifth-most populous country, with a population
                  of almost 243 million people, and has the world's
                  second-largest Muslim population{" "}
                </p>
              </Box>
            </Grid>
            <Grid xs={12} lg={6} style={{ padding: "30px" }}>
              <Box>
                {/* <video width="100%" autoPlay={true} loop={true}>
                  <source src={videoplayback} />
                </video> */}
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  style={{ width: "100%" }}
                  playing={true}
                  url={videoplayback}
                />
              </Box>
            </Grid>
          </Grid>
          {/* -----ABOUT-US-END----------- */}

          {/* ---HOLIDAY_PLANS_START------ */}

          <Box className="mt-5" style={{ textAlign: "center" }}>
            <h3 style={{ color: "white" }}>Perfect Hotels Deals</h3>
            <p style={{ color: "#dddddd" }}>
              No vis fastidii accumsan, ignota postulant ea mea. Vis et prima
              integre, ei vis ridens moderatius reformidans cu vim doctus
              accumsan ignota.
            </p>
          </Box>

          <CardSlider />

          {/* ---HOLIDAY_PLANS_END------ */}

          {/* -----ARTICLES--- */}
          <Grid container className="mt-5">
            <Grid xs={12} lg={12}>
              <div style={{ position: "relative", textAlign: "center" }}>
                <Link to="/artciles">
                  <img
                    src="https://i.dawn.com/primary/2019/01/5c2c5a5cdbc6a.jpg"
                    alt=""
                    width="80%"
                    style={{ filter: "brightness(0.5)" }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "50%",
                      fontSize: "29px",
                      color: "white",
                      width: " 100%",
                    }}
                  >
                    CUSTOMS AND CUISINE OF PAKISTAN
                  </p>
                </Link>
              </div>
            </Grid>
          </Grid>
          {/* -----ARTICLES--- */}

          {/* ----TOP DESTINATION-START---- */}
          <TopDes />
          {/* ----TOP DESTINATION-END---- */}
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Landing;
