import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./TopDes.css";
import { Link } from "react-router-dom";
import { getAllVacationProduct } from "./Redux/Actions/vacationProductAction";

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

 const TopDes = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);

  useEffect(() => {
    dispatch(getAllVacationProduct());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2
        className="mt-5 text-capitalize text-center"
        style={{ color: "white", fontFamily: "cursive" }}
      >
        Top Destinations for your next vacations
      </h2>
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
        ssr={true} // means to render carousel on server-side.
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        // keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        // deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products &&
          products.map((data, index) => {
            return (
              <div key={index._id}>
                <Link to={`/top-destination/${data.slug}/${data._id}`}>
                  <div className="mur">
                    <img
                      src={data.productVacationPicture}
                      className="murree"
                      alt=""
                    />
                    <h2 className="titles">{data.name}</h2>
                  </div>
                </Link>
              </div>
            );
          })}
      </Carousel>
    </>
  );
};

export default TopDes;