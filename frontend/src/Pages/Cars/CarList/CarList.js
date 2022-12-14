import React from "react";
import "./CarList.css";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
const CarList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4} style={{ textAlign: 'center',
    margin: 'auto'}}>
            <img
              className="img-fluid"
              src="https://mediaim.expedia.com/cars/19/7b8cf277-4ee5-46f4-b8fe-ac19c0f41d69.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165"
              alt="SUV "
            ></img>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6">Midsize SUV</Typography>
          <span className="small-span">Kia Sportage or similar</span>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="5" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Unlimited mileage" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AutoAwesomeIcon />
              </ListItemIcon>
              <ListItemText primary="Enhanced cleaning" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AirplaneTicketIcon />
              </ListItemIcon>
              <ListItemText primary="Shuttle to counter and car" />
            </ListItem>
          </List>
        </Grid>
       
        <Grid item xs={12} lg={4} style={{textAlign:'end'}}>
          <Typography variant="h5" style={{color:'black',fontWeight:'bolder'}}>68$</Typography>
          <h6 paragraph>per day</h6>
          <h6 paragraph>$95 total</h6>
          <Button  variant="contained"><Link to={`/car/${'193AKS820jS'}`} style={{color:'white'}}>Continue</Link></Button>

        </Grid>
      </Grid>
    </>
  );
};

export default CarList;
