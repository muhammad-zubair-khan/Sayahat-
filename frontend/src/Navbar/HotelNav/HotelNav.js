import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./HotelNav.css";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../../Context/SearchContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { getAllVacationProduct } from "../../Redux/Actions/vacationProductAction";
// import Tab from "../Components/Tab/Tab";
const HotelNav = (props) => {
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


  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    history.push("/hotels", { state: { destination, dates, options } });
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
      <div className="sec-fh5co-hero">
          <div className="sec-fh5co-overlay"></div>
        <div className="sec-fh5co-cover" data-stellar-background-ratio="0.5">
          <div className="desc">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="tabulation animate-box">
                    {/* <!-- Nav tabs --> */}
                    <ul
                      className="nav nav-tabs"
                      style={{ justifyContent: "center",}}
                      role="tablist"
                    >
                      <li role="presentation">
                        <a
                          href="#stays"
                          aria-controls="stays"
                          role="tab"
                          data-toggle="tab"
                          className="tab-menu active"
                          style={{backgroundColor: '#36494c',
                          color: 'white',
                          boxShadow:' 0px 0px 7px 1px white'}}
                        >
                          Stays
                        </a>
                      </li>
                    </ul>

                    {/* <!-- Tab panes --> */}
                    <div className="tab-content">
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="packages"
                      >
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt">
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
                                  onChange={(e) => setDestination(e.target.value)}
                                  placeholder="Lahore, PK"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt alternate">
                            <div
                              className="input-field search-item"
                              style={{ top: "31px ", textAlign: "center" }}
                            >
                              <CalendarMonthIcon style={{ color: "white" }} />
                              <span
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",

                      fontSize: "14px",
                    }}
                    onClick={() => setOpenDate(!openDate)}
                  >
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
                  {openDate && (
                    <DateRangePicker
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                            </div>
                          </div>
                          <div
                            className=" col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt"
                            style={{ textAlign: "center" }}
                          >
                            <span
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    position: "relative",
                    top: "29px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenOptions(!openOptions)}
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options" style={{position: 'absolute',
                    top: '111px',
                    width: '19%',
                    zIndex: '1000000',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 10px #848484',
                    padding: '7px 10px',
                }}>
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
                          onClick={() => handleOption("adult", "decreament")}
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
                          onClick={() => handleOption("adult", "increament")}
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
                          onClick={() => handleOption("children", "decreament")}
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
                          onClick={() => handleOption("children", "increament")}
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
                          onClick={() => handleOption("room", "decreament")}
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
                          onClick={() => handleOption("room", "increament")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                          </div>
                          <div
                            className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt"
                            style={{ marginTop: "20px" }}
                          >
                            <Button
                              onClick={handleSearch}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                                border: "1px solid white",
                              }}
                            >
                              Search Hotels
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelNav;
