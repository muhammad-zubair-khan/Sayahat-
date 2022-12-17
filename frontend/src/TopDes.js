import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./TopDes.css";
import { Link, useParams } from "react-router-dom";
import { getAllDestinations } from "./Redux/Actions/topDestinationAction";
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

export const TopDes = (props) => {
  const dispatch = useDispatch();
  
  const { products } = useSelector((state) => state.vacationProduct);
  const { destinations } = useSelector((state) => state.allDestinationReducer);
  console.log(destinations);

  useEffect(() => {
    dispatch(getAllVacationProduct());
    dispatch(getAllDestinations());
  }, []);

  return (
    <>
      <h2 className="mt-5 text-capitalize text-center">Top Destinations for your next vacations</h2>
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
        {destinations &&
          destinations.map((data, index) => {
            return (
              <div key={index}>
                <Link to={`/top-destination/${data.slug}/${data._id}`}>
                  <div className="mur">
                    {/* <div className="murree"></div> */}
                    <img
                      src={data.destinationPicture}
                      className="murree"
                      alt=""
                    />
                    <h2 className="titles">{data.name}</h2>
                    {/* </img> */}
                  </div>
                </Link>
              </div>
            );
          })}
      </Carousel>
      {/* <Carousel
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
      </Carousel> */}
    </>
  );
};
