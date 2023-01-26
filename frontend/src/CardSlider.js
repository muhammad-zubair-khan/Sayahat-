import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import PlaceIcon from "@mui/icons-material/Place";
import "./CardSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedHotels } from "./Redux/Actions/hotelAction";
import { ImageUrl } from "./Redux/UrlConfig";
import { Link } from "react-router-dom";


const CardSlider = (props) => {
  const dispatch = useDispatch();
  const { featuredHotels } = useSelector((state) => state.featureHotels);
  useEffect(() => {
    dispatch(getFeaturedHotels());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      {featuredHotels &&
        featuredHotels.map((item) => {
          return (
              <Grid xs={12} lg={3} key={item.id}>
                <div style={{ margin: "0px 10px" }}>
                  <Link to={`/hotels/all`} >
                  <img
                    src={ImageUrl(item.hotelImages[0].img)}
                    style={{ width: "100%", height: "180px" }}
                    alt="Hotel Images"
                  />

                  <PlaceIcon style={{ color: "#de7a08" }} className="my-2" />
                  <span className="text-sm" style={{ color: "#787878" }}>
                    {item.city}
                  </span>
                  <h5 style={{ color: "white", fontSize: "16px" }}>
                    {item.name}
                  </h5>
                  {/* <h6>7 Days Tour on 2 person</h6> */}
                  <span style={{ color: "white" }}>
                    {item.cheapestPrice} PKR
                  </span>
                  </Link>
                </div>
              </Grid>
          );
        })}
    </Grid>
  );
};

export default CardSlider;
