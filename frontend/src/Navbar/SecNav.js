import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import "./SecNav.css";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";
import { SearchContext } from "../Context/SearchContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useEffect } from "react";
import { getAllVacationProduct } from "../Redux/Actions/vacationProductAction";
const SecNav = (props) => {
  const history = useHistory();
  //Stays
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

  //package
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [packageDestination, setPackageDestination] = useState("");

  const { dispatch } = useContext(SearchContext);

  const handlePackageSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { packageDestination, dates, options },
    });
    history.push("/packages", {
      state: { packageDestination, dates, options },
    });
  };

  const { products } = useSelector((state) => state.vacationProduct);
  useEffect(() => {
    dispatch(getAllVacationProduct());
  }, [dispatch]);

  const handleOnSelect = (product) => {
    setPackageDestination(product.name);
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
                      style={{ justifyContent: "center" }}
                      role="tablist"
                    >
                      <li role="presentation">
                        <a
                          href="#packages"
                          aria-controls="packages"
                          role="tab"
                          data-toggle="tab"
                          className="tab-menu active"
                          style={{
                            backgroundColor: "#36494c",
                            color: "white",
                            boxShadow: " 0px 0px 7px 1px white",
                          }}
                        >
                          Vacations
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
                            >{`${options.adult} Adult - ${options.children} Children`}</span>
                            {openOptions && (
                              <div
                                className="options2"
                                style={{
                                  position: "absolute",
                                  top: "111px",
                                  width: "19%",
                                  zIndex: "1000000",
                                  backgroundColor: "white",
                                  boxShadow: "0px 0px 10px #848484",
                                  padding: "7px 10px",
                                }}
                              >
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
                              </div>
                            )}
                          </div>
                          <div
                            className="col-xxs-12 col-xs-12 col-md-3 col-lg-3 mt"
                            style={{ marginTop: "20px" }}
                          >
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecNav;
