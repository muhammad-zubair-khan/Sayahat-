import React, { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
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
const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  // console.log(location.state.state.destination)
  const [dates, setDates] = useState(location.state.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/api/all-hotels?city=${destination}&min=${min || 0}&max=${
      max || 99999
    }`
  );
console.log(data)
  const handleClick = () => {
    reFetch();
  };
  return (
    <>
      {/* <div className="listContainer">
        <div className="listWrapper"> */}
      <Row container className="mt-5">
        <Col md={6} lg={4}>
          <div className="listSearch">
            {/* <h1 className="lsTitle">Search</h1> */}
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
                  disabledDates={true}
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
             {/* {data && data.map((item,index)=>{
            
              return(
                <>
                <span style={{color:'white'}}>{item.type} </span><input type="checkbox" /><span style={{color:'white',float:'right'}}>
                {item.type.length}
                  </span>
                  <br/>

                </>
              )
             })} */}
                {/* <span style={{color:'white'}}>Appartments </span><input type="checkbox" /> */}
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
          </div>
        </Col>
        <Col md={6} lg={8}>
          {/* <div className="listResult"> */}
          {loading ? (
            "loading"
          ) : (
            <>
           { console.log(data)}
              {data.hotels && data.hotels.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
          )}
          {/* </div> */}
        </Col>
      </Row>

      {/* </div>
      </div> */}
    </>
  );
};

export default HotelList;
