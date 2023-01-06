import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "../../Landing/Landing.css";
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
const Tab = () => {
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
    history.push(`/cars`, {
      state: {
        startDestination,
        endDestination,
        pickupTime,
        dropoffTime,
        dates,
      },
    });
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
      <div className="tabulation animate-box">
        {/* <!-- Nav tabs --> */}
        <ul
          className="nav nav-tabs"
          style={{ justifyContent: "center" }}
          role="tablist"
        >
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
          <div role="tabpanel" className="tab-pane active" id="cars">
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
                    // autoFocus
                    formatResult={CarformatResult}
                    value={startDestination}
                    onChange={(e) => setStartDestination(e.target.value)}
                    placeholder="Lahore, PK"
                  />
                </div>
              </div>
              <div className="col-xxs-12 col-xs-6 col-md-3 col-lg-3 mt">
                <div className="input-field">
                  <label for="To">To:</label>
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
                    // autoFocus
                    formatResult={CarformatResult}
                    value={endDestination}
                    onChange={(e) => setEndDestination(e.target.value)}
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
                      borderRadius: 0,
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
                      borderRadius: 0,
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
                      {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                        dates[0].endDate,
                        "MM/dd/yyyy"
                      )}`}
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
                <div
                  className="col-xxs-12 col-xs-6 col-md-9 col-lg-9"
                  style={{ textAlign: "end" }}
                >
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      border: "1px solid white",
                    }}
                    onClick={handleCarSearch}
                  >
                    Search Cars
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
                      onChange={(e) => setDestination(e.target.value)}
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

              <div
                className="col-xxs-12 col-xs-12 col-md-4 col-lg-4 mt alternate"
                style={{ textAlign: " center" }}
              >
                <div
                  className="input-field search-item"
                  style={{ top: "31px" }}
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
                className=" col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt"
                style={{ textAlign: " center" }}
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

              <div className="col-xs-12 mt">
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
                      onChange={(e) => setPackageDestination(e.target.value)}
                      placeholder="Lahore, PK"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt alternate">
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
                    onClick={() => setOpenPackageDate(!openPackageDate)}
                  >
                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>
                  {openPackageDate && (
                    <DateRangePicker
                      editableDateInputs={true}
                      ranges={dates}
                      moveRangeOnFirstSelection={false}
                      onChange={(item) => setDates([item.selection])}
                      className="date"
                    />
                  )}
                </div>
              </div>
              <div
                className=" col-xxs-12 col-xs-6 col-md-4 col-lg-4 mt"
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
                    
                  </div>
                )}
              </div>
              <div className="col-xs-12">
                <Button
                  onClick={handlePackageSearch}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                  }}
                >
                  Search Packages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
