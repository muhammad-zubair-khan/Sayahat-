import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";

const Search = () => {
  const location = useLocation();
  const [startdestination, setStartDestination] = useState(
    location.state.state.startdestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [openDate, setOpenDate] = useState(false); //Car

  //Car
  const [date, setDate] = useState(location.state.date);
  return (
    <>
      <div className="searchCars">
        <div role="tabpanel" className="tab-pane active" id="cars">
          <div className="row">
            <div className="col-xxs-12 col-xs-6 mt">
              <div className="input-field">
                <label for="from">From:</label>
                <input
                  type="text"
                  className="form-control"
                  id="from-place"
                  placeholder={startdestination}
                  //   onChange={(e) => setStartDestination(e.target.value)}
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
                  placeholder={endDestination}
                />
              </div>
            </div>
            <div className="col-xxs-12 col-xs-6 mt alternate">
              <div className="input-field search-item">
                <CalendarMonthIcon style={{ color: "black" }} />
                <span
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontSize: "14px",
                  }}
                  onClick={() => setOpenDate(!openDate)}
                >
                  {/* {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`} */}
                  {`${format(
                    location.state.state.date[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(
                    location.state.state.date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
