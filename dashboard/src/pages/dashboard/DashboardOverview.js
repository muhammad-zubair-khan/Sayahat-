import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./DashboardOverview.css";
import { AppBar } from "@mui/material";
// import MetaData from "../../components/layouts/MetaData";
const DashboardOverview = () => {

  return (
    <>
      {/* <MetaData title={`Admin Dashboard`} /> */}
    <main className="content">
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <h1>Welcome Back</h1> */}
      </div>

      {/* <div className="dashboardSummary">
        <div className="dashboardSummaryBox2">
          <Link to="/product/all">
          <StorefrontIcon/>
            <p className="para">Product</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/category/create">
          <CategoryIcon />
            <p className="para">Category</p>
            <p>
              {category.categories[0] && category.categories[0].children.length}
            </p>
          </Link>
        </div>
      </div> */}

     
      </main>
    </>
  );
};

export default DashboardOverview;
