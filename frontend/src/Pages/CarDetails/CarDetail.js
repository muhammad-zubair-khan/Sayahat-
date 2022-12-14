import { Container, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const CarDetail = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.authenticate) {
    return <Redirect to={`/account`} />;
  }
  return (
    <div style={{background:' rgb(0 0 0)',
    height: '75px'}}>
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
    </div>
  );
};

export default CarDetail;
