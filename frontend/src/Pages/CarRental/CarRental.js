import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Footer from "../../Footer/Footer";
import Search from "../Search/Search";
import CarList from "../Cars/CarList/CarList";
import { Container, Grid } from '@mui/material';
const CarRental = () => {
  return (
    <div style={{background:' rgb(0 0 0)',
    height: '75px'}}>
      <Navbar />
      <Container>
        <Grid container style={{padding: '0px 15px',paddingTop:'150px'}}>
          <Grid xs={12} md={9} lg={9}>
            <CarList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  )
}

export default CarRental