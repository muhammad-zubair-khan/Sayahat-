import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Landing from "./Landing/Landing";
import Home from "./Pages/Home/Home.js";
import Hotel from "./Pages/Hotel/Hotel";
import HotelDetail from "./Pages/HotelDetails/HotelDetail";
import Car from "./Pages/Cars/Car";
import CarDetail from "./Pages/CarDetails/CarDetail";
import Aboutus from "./Pages/About/Aboutus";
import Contactus from "./Pages/Contact/Contactus.js";
import LahoreCity from "./Pages/Cities/LahoreCity";
import Tours from "./Pages/Tours/Tours";

function App() {

  return (
    
        <BrowserRouter>
          <Routes>
            <Route exact path="/"  element={<Home/>}/>
            <Route exact path="/lahore"  element={<LahoreCity/>}/>
            <Route exact path="/hotels"  element={<Hotel/>}/>
            <Route exact path="/hotel/:id" element={<HotelDetail/>}/>
            <Route exact path="/cars" element={<Car/>}/>
            <Route exact path="/car/:id" element={<CarDetail/>}/>
            <Route exact path="/aboutus" element={<Aboutus/>}/>
            <Route exact path="/contactus" element={<Contactus/>}/>
            <Route exact path="/tours"  element={<Tours/>}/>
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
     
  );
}

export default App;
