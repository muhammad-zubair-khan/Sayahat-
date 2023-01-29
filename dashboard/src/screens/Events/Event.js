import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "./Event.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookedPackages } from "../../Redux/Actions/bookPackageAction";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { getAllBookedHotels } from "../../Redux/Actions/bookHotelAction";
import { getAllBookedCars } from "../../Redux/Actions/bookCarAction";
const localizer = momentLocalizer(moment);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Event = (props) => {
  const [showHotelEvent, setShowHotelEvent] = useState(true);
  const [showCarEvent, setShowCarEvent] = useState(false);
  const [showPackageEvent, setShowPackageEvent] = useState(false);
  const dispatch = useDispatch();
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  const { bookedPackages } = useSelector((state) => state.allBookedPackages);
  const { bookedHotels } = useSelector((state) => state.allBookedHotels);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    dispatch(getAllBookedCars());
    dispatch(getAllBookedPackages());
    dispatch(getAllBookedHotels());
  }, [dispatch]);

  const handleHotelEvents = () => {
    setShowHotelEvent(true);
    setShowCarEvent(false);
    setShowPackageEvent(false);
    toggleTab(1);
  };
  const handleCarEvents = () => {
    setShowCarEvent(true);
    setShowHotelEvent(false);
    setShowPackageEvent(false);
    toggleTab(2);
  };
  const handlePackageEvents = () => {
    setShowPackageEvent(true);
    setShowCarEvent(false);
    setShowHotelEvent(false);
    toggleTab(3);
  };

  const carEvents =
    bookedCars &&
    bookedCars.map((data) => ({
      title: data.name,
      allDay: true,
      start: new Date(data.StartingDate),
      end: new Date(data.EndingDate),
      // TimeRanges: {
      //     end: data.activityInfo.time,
      //     start: data.activityInfo.time
      // }
    }));

  const hotelEvents =
    bookedHotels &&
    bookedHotels.map((data) => ({
      title: data.name,
      allDay: true,
      start: new Date(data.hotelActivityInfo.dates[0].startDate),
      end: new Date(data.hotelActivityInfo.dates[0].endDate),
      // TimeRanges: {
      //     end: data.activityInfo.time,
      //     start: data.activityInfo.time
      // }
    }));

  const packageEvents =
    bookedPackages &&
    bookedPackages.map((data) => ({
      title: data.name,
      allDay: true,
      start: new Date(data.activityInfo.travelDate),
      end: new Date(data.activityInfo.travelDate),
      // TimeRanges: {
      //     end: data.activityInfo.time,
      //     start: data.activityInfo.time
      // }
    }));

  // var tabContainer = document.getElementById('tab-container')
  // var tab = document.getElementsByClassName('tab-item')

  // for (let i = 0; i < tab.length; i++) {
  //     tab[i].addEventListener('click',function(){
  //         var curr = document.getElementsByClassName("act");
  //         curr[0].className = curr[0].className.replace(" act");
  //         this.className += " act"
  //     });

  // }

  return (
    <>
      <Sidebar>
        <Header />
        <Stack
          direction="row"
          spacing={2}
          className="justify-content-around my-5"
          id="tab-container"
        >
          <Item
            style={{ cursor: "pointer" }}
            onClick={handleHotelEvents}
            className={toggleState === 1 ? "act" : "tab-item"}
          >
            Hotel Events
          </Item>
          <Item
            style={{ cursor: "pointer" }}
            onClick={handleCarEvents}
            className={toggleState === 2 ? "act" : "tab-item"}
          >
            Car Events
          </Item>
          <Item
            style={{ cursor: "pointer" }}
            onClick={handlePackageEvents}
            className={toggleState === 3 ? "act" : "tab-item"}
          >
            Packages Events
          </Item>
        </Stack>
        {showHotelEvent && (
          <>
            <h5 style={{ textAlign: "center", margin: "30px" }}>
              Hotel Events
            </h5>
            <Calendar
              localizer={localizer}
              events={hotelEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </>
        )}
        {showCarEvent && (
          <>
            <h5 style={{ textAlign: "center", margin: "30px" }}>Car Events</h5>
            <Calendar
              localizer={localizer}
              events={carEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </>
        )}
        {showPackageEvent && (
          <>
            <h5 style={{ textAlign: "center", margin: "30px" }}>
              Package Events
            </h5>
            <Calendar
              localizer={localizer}
              events={packageEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </>
        )}
      </Sidebar>
    </>
  );
};

export default Event;
