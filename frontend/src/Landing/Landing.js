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
import { Container } from "@mui/material";
import videoplayback from "../Assets/videoplayback.mp4";
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
// import { useHistory } from "react-router-dom";
import { getAllHotels } from "../Redux/Actions/hotelAction";
import { SearchContext } from "../Context/SearchContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { getAllVacationProduct } from "../Redux/Actions/vacationProductAction";
import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { TimePicker } from '@mui/x-date-pickers';
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const Landing = ({ type }) => {
  const history = useHistory();
  // const dispatch = useDispatch()
  // const {slug}= useParams()
  // const [endDestination, setEndDestination] = useState("");
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
  // const [pickupTime,setPickupTime] = useState("");
  // const [dropoffTime,setDropoffTime] = useState("");
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
  // const [openHotelDate, setOpenHotelDate] = useState(false); //Hotel
  // const [hotelDate, setHotelDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

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
    dispatch({ type: "NEW_SEARCH", payload: { packageDestination, dates, options } });
    history.push(`/package/${destination}`, {
      state: { packageDestination, dates, options },
    });
  };
  const handleCarSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { startDestination, endDestination, pickupTime, dropoffTime, dates,options } });
    history.push(`/cars?from=${startDestination}&to=${endDestination}&pickup-Time=${pickupTime}&dropoff-time=${dropoffTime}`, {
      state: { startDestination, endDestination, pickupTime, dropoffTime, dates  },
    });
  };
  const { products } = useSelector((state) => state.vacationProduct);
  console.log(products);
  useEffect(() => {
    dispatch(getAllVacationProduct());
  }, []);

  // const items = [
  //   {
  //     id: 0,
  //     name: 'Cobol'
  //   },
  //   {
  //     id: 1,
  //     name: 'JavaScript'
  //   },
  //   {
  //     id: 2,
  //     name: 'Basic'
  //   },
  //   {
  //     id: 3,
  //     name: 'PHP'
  //   },
  //   {
  //     id: 4,
  //     name: 'Java'
  //   }
  // ]
  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results)
  // }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (product) => {
    // the item selected
    setDestination(product.name);
    console.log(product);
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
                <div className="col-sm-12 col-md-5 col-lg-5">
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
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">From:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
                                onChange={(e) =>
                                  setStartDestination(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">To:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Islamabad, PK"
                                onChange={(e) =>
                                  setEndDestination(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">Pick-up Time</label>
                              <input
                                type="time"
                                className="form-control"
                                onChange={(e) =>
                                  setPickupTime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">Drop-off Time</label>
                              <input
                                type="time"
                                className="form-control"
                                onChange={(e) =>
                                  setDropoffTime(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt alternate">
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
                                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                              </span>
                              {openCarDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  ranges={dates}
                                  moveRangeOnFirstSelection={false}
                                  onChange={(item) => setDates([item.selection])}
                                  className="date"
                                  minDate={new Date()}
                                />
                              )}
                            </div>
                          </div>

                          <div className="col-xs-12">
                            <input
                              className="btn btn-primary btn-block"
                              value="Search Car"
                              onClick={handleCarSearch}
                            />
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="stays">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <div style={{ width: 400 }}>
                                <ReactSearchAutocomplete
                                  items={products}
                                  // onSearch={handleOnSearch}
                                  onHover={handleOnHover}
                                  onSelect={handleOnSelect}
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

                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field search-item">
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
                          <div className=" col-xxs-12 col-xs-6 mt">
                            <section>
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",

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
                            </section>
                          </div>

                          <div className="col-xs-12 mt">
                            <button
                              onClick={handleSearch}
                              className="btn btn-primary btn-block"
                              value="Search Hotels"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* /////////////////////////////////////////////////////////////// */}
                      <div role="tabpanel" className="tab-pane" id="packages">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              {/* <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
                              /> */}
                              <div style={{ width: 400 }}>
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
                          {/* <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">Destination:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Islamabad, PK"
                              />
                            </div>
                          </div> */}
                          <div className="col-xxs-12 col-xs-6 mt alternate">
                            <div className="input-field search-item">
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

                          <div className=" col-xxs-12 col-xs-6 mt">
                            <section>
                              <span
                                style={{
                                  color: "rgba(255, 255, 255, 0.8)",
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
                                          handleOption(
                                            "children",
                                            "decreament"
                                          )
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
                                          handleOption(
                                            "children",
                                            "increament"
                                          )
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
                            </section>
                          </div>
                          <div className="col-xs-12">
                            <input
                              onClick={handlePackageSearch}
                              className="btn btn-primary btn-block"
                              value="Search Packages"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="desc2 animate-box col-md-7 col-sm-12 col-lg-7">
                  <div>
                    <h2>
                      Be a Traveler not a <br /> Tourist
                    </h2>
                    <span style={{ color: "#c3bfbf" }}>
                      Travel to the any corner of the world, without going
                      around in circles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------Special Offers & Discount----------------------------- */}
      <Container>
        <div className="mt-5">
          <h3>Special Offers & Discount</h3>
          <p>
            Lorem Ipsum is simply dummy text the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>

          {/* ---------------CARDS----START */}
          <MyCard />
          {/* ---------------CARDS----END */}
        </div>

        {/* -----ABOUT-US-START----------- */}
        <Grid container className="mt-5">
          <Grid xs={12} lg={6}>
            <Box style={{ textAlign: "center", padding: "52px 04px" }}>
              <h3>What You Know About Pakistan?</h3>
              <p style={{ textAlign: "justify", marginTop: "10px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                urna lectus, lacinia ut magna eu, congue dictum libero.
                Curabitur est elit, scelerisque nec congue quis, rutrum non
                enim. Fusce hendrerit aliquam ipsum, et finibus ligula. Aliquam
                vitae pellentesque neque. Nulla ac augue dictum, tincidunt nibh
                a, venenatis libero. Vestibulum euismod leo ex, sit amet ornare
                ex scelerisque blandit. Quisque blandit orci quis varius
                tincidunt. Nullam gravida egestas scelerisque. Cras feugiat
                ligula vitae varius finibus. Vivamus fringilla ultricies leo
                eget suscipit. Morbi imperdiet velit eu ipsum euismod finibus.{" "}
              </p>
            </Box>
          </Grid>
          <Grid xs={12} lg={6} style={{ padding: "30px" }}>
            <Box>
              <video width="100%" controls loop={true}>
                <source src={videoplayback} />
              </video>
            </Box>
          </Grid>
        </Grid>
        {/* -----ABOUT-US-END----------- */}

        {/* ---HOLIDAY_PLANS_START------ */}

        <Box className="mt-5" style={{ textAlign: "center" }}>
          <h3>Perfect Holiday Plan</h3>
          <p>
            No vis fastidii accumsan, ignota postulant ea mea. Vis et prima
            integre, ei vis ridens moderatius reformidans cu vim doctus accumsan
            ignota.
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
                  style={{}}
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
      <Footer />
    </>
  );
};

export default Landing;
