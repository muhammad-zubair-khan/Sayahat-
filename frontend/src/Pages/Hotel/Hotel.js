import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Search from "../Search/Search";
import HotelList from "./HotelList/HotelList";
import "./Hotel.css";
import { Container, Grid } from "@mui/material";
const Hotel = () => {
  return (
    <>
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      <Container>
        <HotelList />
      </Container>
      <Footer />
    </>
  );
};

export default Hotel;
