import React, { useEffect } from "react";
import "./MyCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeaturedPackages } from "./Redux/Actions/packageAction";
import { Button, Grid } from "@mui/material";
import { ImageUrl } from "./Redux/UrlConfig";

const MyCard = () => {
  const { packages } = useSelector((state) => state.featurePackages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFeaturedPackages());
  }, []);

  return (
    <>
      <Grid container>
        {packages.map((item, index) => {
          return (
            <Grid md={4}>
              <div className="card1">
                <div key={index}>
                  <img
                    src={ImageUrl(item.packageImages[0].img)}
                    className="card-img"
                    alt=""
                  />
                  <h2 className="heading-card">{item.city}</h2>
                  <div className="content-1">
                    <h3>{item.name}</h3>
                    <Link to={`/vacation/${item.product}/${item.city}/${item._id}/detail`}>
                      <Button variant="contained" style={{color:'white', backgroundColor:'#e17c35'}}>
                        Tour Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MyCard;
