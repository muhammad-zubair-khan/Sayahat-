import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./PackageReserveSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PackageReserveSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Tour Package has been Reserved successfully </Typography>
      <Link to="/myPackages">View Packages</Link>
    </div>
  );
};

export default PackageReserveSuccess;