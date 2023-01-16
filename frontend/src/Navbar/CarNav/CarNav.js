import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./CarNav.css";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";
import { SearchContext } from "../../Context/SearchContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { getAllVacationProduct } from "../../Redux/Actions/vacationProductAction";
const CarNav = (props) => {
  const history = useHistory();
  //Car
  const [startDestination, setStartDestination] = useState("");
  const [endDestination, setEndDestination] = useState("");
  const [openCarDate, setOpenCarDate] = useState(false);
  const [pickupTime, setPickupTime] = useState(null);
  const [dropoffTime, setDropoffTime] = useState(null);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { dispatch } = useContext(SearchContext);
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

  const CarhandleOnSelect = (product) => {
    setStartDestination(product.name);
  };
  const CarEndhandleOnSelect = (product) => {
    // the item selected
    setEndDestination(product.name);
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

  return (
    <>
      <div className="sec-fh5co-hero">
        <div className="sec-fh5co-overlay"></div>
        <div
          className="car-sec-fh5co-cover"
          data-stellar-background-ratio="0.5"
        >
          <div className="car-desc">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
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
                          style={{
                            backgroundColor: "#36494c",
                            color: "white",
                            boxShadow: " 0px 0px 7px 1px white",
                          }}
                        >
                          Cars
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
                          <div className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="from">From:</label>
                              <div>
                                <ReactSearchAutocomplete
                                  items={products}
                                  onSelect={CarhandleOnSelect}
                                  formatResult={CarformatResult}
                                  value={startDestination}
                                  onChange={(e) =>
                                    setStartDestination(e.target.value)
                                  }
                                  placeholder="Lahore, PK"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt">
                            <div className="input-field">
                              <label for="to">To:</label>
                              <div>
                                <ReactSearchAutocomplete
                                  items={products}
                                  onSelect={CarEndhandleOnSelect}
                                  formatResult={CarformatResult}
                                  value={endDestination}
                                  onChange={(e) =>
                                    setEndDestination(e.target.value)
                                  }
                                  placeholder="Islamabad, PK"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt">
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
                          <div className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt">
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

export default CarNav;
