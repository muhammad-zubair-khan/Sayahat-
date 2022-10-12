import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import weblogo from "../../src/assets/logo/web dev logo.jpg";
// import dmlogo from "../../src/assets/logo/dmlogo.jpg";
import { Container } from "@mui/material";
import "./TopDes.css";
import { Link } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export const TopDes = () => {
  return (
    <>
      <h2 className="mt-5">Top destinations for your next vacation</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        style={{ marginTop: "10px" }}
        // showDots={true}
        // ssr={true} // means to render carousel on server-side.
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={500}
        // containerClass="carousel-container"
        // deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
      >
        <Link to="#">
          <div className="mur">
            <div className="murree"></div>

            <h2 className="titles">Murree</h2>
          </div>
        </Link>

        <Link to="#">
          <div className="mur">
            <div className="Kalam"></div>

            <h2 className="titles">Kalam Valley.</h2>
          </div>
        </Link>

        <Link to="#">
          <div className="mur">
            <div className="chitral"></div>

            <h2 className="titles">Chitral</h2>
          </div>
        </Link>

        <Link to="#">
          <div className="mur">
            <div className="cholistan"></div>

            <h2 className="titles">Cholistan Desert</h2>
          </div>
        </Link>
      </Carousel>
    </>
  );
};
