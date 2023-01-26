import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./PackageReserveSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../MetaData/MetaData";

const CarBookingSuccess = () => {
  return (
    <>
      <MetaData title={`Sayahat: Payment`} />
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Car has been Booked successfully </Typography>
      <Link to="/myCars">View Cars</Link>
    </div>
    </>
  );
};

export default CarBookingSuccess;
