import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Search from "../Search/Search";
import CarList from "./CarList/CarList";
import "./Car.css";
import { Container, Grid } from "@mui/material";
const Car = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container style={{padding: '0px 15px',paddingTop:'150px'}}>
          <Grid xs={12} md={3} lg={3} >
            <Search />
          </Grid>
          <Grid xs={12} md={9} lg={9}>
            <CarList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Car;
