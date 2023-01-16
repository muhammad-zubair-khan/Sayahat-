import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./PackageReserveSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CarBookingSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Car has been Booked successfully </Typography>
      <Link to="/myCars">View Cars</Link>
    </div>
  );
};

export default CarBookingSuccess;
