import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import HotelList from "./HotelList/HotelList";
import "./Hotel.css";
import MetaData from "../../Components/MetaData/MetaData";
import { useLocation } from "react-router-dom";
const Hotel = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(
    location.state.state.destination
    );

  return (
    <>
    <MetaData title={`${destination}, Pakistan - Hotel Search Results`}/>
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      {/* <Container> */}
        <HotelList />
      {/* </Container> */}
      <Footer />
    </>
  );
};

export default Hotel;
