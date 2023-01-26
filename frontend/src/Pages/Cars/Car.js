import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import CarList from "./CarList/CarList";
import "./Car.css";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import MetaData from "../../Components/MetaData/MetaData";
const Car = () => {
  const location = useLocation()
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  return (
    <>
    <MetaData title={`Rental Cars and Car Rentals at ${startDestination} from Sayahat`}/>
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
    </>

  );
};

export default Car;
