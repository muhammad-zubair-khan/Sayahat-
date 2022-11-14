import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const SecNav = () => {
    const [startdestination, setStartDestination] = useState("");
    const [endDestination, setEndDestination] = useState("");
    const [openDate, setOpenDate] = useState(false); //Car
    const navigate = useNavigate();
  
    //Car
    const [date, setDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    //Hotel
    const [openHotelDate, setOpenHotelDate] = useState(false); //Hotel
    const [hotelDate, setHotelDate] = useState([
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
  
    //Package
    const [openPackageDate, setOpenPackageDate] = useState(false);
    const [packageDate, setPackageDate] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  
    //package options
    const [openOptions2, setOpenOptions2] = useState(false);
    const [options2, setOptions2] = useState({
      adult: 1,
      children: 0,
      room: 1,
    });
    //Hotel
    const handleOption2 = (name, operation) => {
      setOptions2((prev) => {
        return {
          ...prev,
          [name]:
            operation === "increament" ? options2[name] + 1 : options2[name] - 1,
        };
      });
    };
    const handleSearch = () => {
      navigate("/cars", { state: { startdestination, endDestination, date } });
    };
  return (
    <>
          <div className="fh5co-hero1">
        <div
          className="fh5co-overlay1"
          style={{ backgroundColor: " !important" }}
        ></div>
        <div className="fh5co-cover1" data-stellar-background-ratio="0.5">
          <div
            className="desc"
            style={{
              top: "25%",
              position: "absolute",
              width: "100%",
              /* margin-top: -80px; */
              zIndex: "2",
              color: "#fff",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div
                    className="tabulation animate-box"
                    style={{ padding: "0 17px" }}
                  >
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
                    <div className="tab-content" style={{ padding: "16px" }}>
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
                                  date[0].startDate,
                                  "MM/dd/yyyy"
                                )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                              </span>
                              {openDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  ranges={date}
                                  moveRangeOnFirstSelection={false}
                                  onChange={(item) => setDate([item.selection])}
                                  className="date"
                                  minDate={new Date()}
                                />
                              )}
                            </div>
                          </div>

                          <div className="col-xs-12">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Car"
                              onClick={handleSearch}
                            />
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="stays">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-12 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
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
                                onClick={() => setOpenHotelDate(!openHotelDate)}
                              >
                                {`${format(
                                  hotelDate[0].startDate,
                                  "MM/dd/yyyy"
                                )} to ${format(
                                  hotelDate[0].endDate,
                                  "MM/dd/yyyy"
                                )}`}
                              </span>
                              {openHotelDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  ranges={hotelDate}
                                  moveRangeOnFirstSelection={false}
                                  onChange={(item) =>
                                    setHotelDate([item.selection])
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
                              >{`${options.adult} Adult - ${options.children} Children - ${options.room} Room`}</span>
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
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Hotel"
                            />
                          </div>
                        </div>
                      </div>

                      <div role="tabpanel" className="tab-pane" id="packages">
                        <div className="row">
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">City:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="from-place"
                                placeholder="Lahore, PK"
                              />
                            </div>
                          </div>
                          <div className="col-xxs-12 col-xs-6 mt">
                            <div className="input-field">
                              <label for="from">Destination:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="to-place"
                                placeholder="Islamabad, PK"
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
                                onClick={() =>
                                  setOpenPackageDate(!openPackageDate)
                                }
                              >
                                {`${format(
                                  packageDate[0].startDate,
                                  "MM/dd/yyyy"
                                )} to ${format(
                                  packageDate[0].endDate,
                                  "MM/dd/yyyy"
                                )}`}
                              </span>
                              {openPackageDate && (
                                <DateRangePicker
                                  editableDateInputs={true}
                                  ranges={packageDate}
                                  moveRangeOnFirstSelection={false}
                                  onChange={(item) =>
                                    setPackageDate([item.selection])
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
                                onClick={() => setOpenOptions2(!openOptions2)}
                              >{`${options2.adult} Adult - ${options2.children} Children - ${options2.room} Room`}</span>
                              {openOptions2 && (
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
                                        disabled={options2.adult <= 1}
                                        onClick={() =>
                                          handleOption2("adult", "decreament")
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
                                        {options2.adult}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "1px" }}
                                        onClick={() =>
                                          handleOption2("adult", "increament")
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
                                        disabled={options2.children <= 0}
                                        onClick={() =>
                                          handleOption2(
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
                                        {options2.children}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption2(
                                            "children",
                                            "increament"
                                          )
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
                                        disabled={options2.room <= 1}
                                        onClick={() =>
                                          handleOption2("room", "decreament")
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
                                        {options2.room}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption2("room", "increament")
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
                          <div className="col-xs-12">
                            <input
                              type="submit"
                              className="btn btn-primary btn-block"
                              value="Search Packages"
                            />
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
  )
}

export default SecNav