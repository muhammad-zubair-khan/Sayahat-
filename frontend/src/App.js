import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Landing from "./Landing/Landing";
import Home from "./Pages/Home/Home";
import Hotel from "./Pages/Hotel/Hotel";
import HotelDetail from "./Pages/HotelDetails/HotelDetail";
import Car from "./Pages/Cars/Car";
import CarDetail from "./Pages/CarDetails/CarDetail";
import Aboutus from "./Pages/About/Aboutus";
import Contactus from "./Pages/Contact/Contactus";
import Cities from "./Pages/Citites/Cities";
import { useDispatch } from "react-redux";
import { getAllVacationsCategory } from "./Redux/Actions/vacationCategoryAction";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVacationsCategory());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/hotels" element={<Hotel />} />
        <Route exact path="/hotel/:id" element={<HotelDetail />} />
        <Route exact path="/cars" element={<Car />} />
        <Route exact path="/car/:id" element={<CarDetail />} />
        <Route exact path="/aboutus" element={<Aboutus />} />
        <Route exact path="/contactus" element={<Contactus />} />
        <Route path="/vacation/:slug" exact element={<Cities/>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
