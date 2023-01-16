import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Search from "../Search/Search";
import CarList from "./CarList/CarList";
import "./Car.css";
import { Container, Grid } from "@mui/material";
const Car = () => {
  return (
    <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
      <Navbar />
      <Container>
        <Grid container style={{ padding: "0px 15px", paddingTop: "150px" }}>
          <Grid xs={12} md={9} lg={12}>
            <CarList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Car;
