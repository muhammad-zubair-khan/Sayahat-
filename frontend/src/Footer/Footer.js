import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import "./Footer.css";
import logo from "../Assets/logo/SAYAHAT.png";
import { Link } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
const Footer = () => {
  return (
    <div style={{ backgroundColor: "#e3e3e3", padding: "20px 0px" }}>
      <Container>
        <Grid container>
          <Grid xs={12} lg={3}>
            <Link to="/">
              <img src={logo} width="200px" alt="Sayahat" />
            </Link>
            <p className="mt-4">
              We believe brand interaction is key in commu- nication. Real
              innovations and a positive customer experience are the heart of
              successful communication.
            </p>
            <Box>
              <Link to="#">
                <i
                  style={{ fontSize: "30px", margin: "0 10px", color: "black" }}
                  className="bi bi-facebook"
                ></i>
              </Link>
              <Link to="#">
                <i
                  style={{ fontSize: "30px", margin: "0 10px", color: "black" }}
                  className="bi bi-twitter"
                ></i>
              </Link>
              <Link to="#">
                <i
                  style={{ fontSize: "30px", margin: "0 10px", color: "black" }}
                  className="bi bi-instagram"
                ></i>
              </Link>
            </Box>
          </Grid>
          <Grid xs={12} lg={3}>
            <h5 style={{ padding: "0px 20px" }}>Contact us</h5>
            <Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PlaceIcon />
                    </ListItemIcon>
                    <ListItemText primary="512 Saint Charles Road Carol Stream , IL 60188" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="info.Sayahat.com" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="+088 012121240" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Grid>
          <Grid xs={12} lg={3}>
            <h5 style={{ padding: "0px 15px" }}>Quick Link</h5>
            <List>
              <ListItem>
                <Link style={{ color: "#848484" }}>Home</Link>
              </ListItem>
              <ListItem>
                <Link style={{ color: "#848484" }}>Vacations</Link>
              </ListItem>
              <ListItem>
                <Link style={{ color: "#848484" }}>Hotels</Link>
              </ListItem>
              <ListItem>
                <Link style={{ color: "#848484" }}>Cars</Link>
              </ListItem>
              <ListItem>
                <Link style={{ color: "#848484" }}>About us</Link>
              </ListItem>
              <ListItem>
                <Link style={{ color: "#848484" }}>Contact us</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid xs={12} lg={3}>
            <h5 style={{ padding: "0px 15px" }}>Help</h5>
            <List>
              <ListItem>
                <span>Support</span>
              </ListItem>
              <ListItem>
                <span>Cancel your hotel or vacation rental booking</span>
              </ListItem>
              <ListItem>
                <span>Refund timelines, policies & processes</span>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
