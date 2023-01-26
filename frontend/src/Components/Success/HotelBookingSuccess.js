import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./PackageReserveSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../MetaData/MetaData";

const HotelBookingSuccess = () => {
  return (
    <>
    <MetaData title={`Sayahat: Payment Successfull!!`}/>
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Hotel has been Booked successfully </Typography>
      <Link to="/myHotels">View Hotels</Link>
    </div>
    </>
  );
};

export default HotelBookingSuccess;
