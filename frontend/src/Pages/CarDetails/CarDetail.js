import { Container, Grid } from "@mui/material";
import React from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const CarDetail = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container style={{padding: '0px 15px',paddingTop:'150px'}}>
          <Grid xs={12} md={8} lg={8}  style={{border:'1px solid black'}}>
            info
          </Grid>
          <Grid xs={12} md={4} lg={4} style={{border:'1px solid black'}}>
            Payment Detail
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CarDetail;
