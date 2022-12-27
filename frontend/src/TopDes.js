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
  // const { destinations } = useSelector((state) => state.allDestinationReducer);
  // console.log(destinations);

  useEffect(() => {
    dispatch(getAllVacationProduct());
    // dispatch(getAllDestinations());
  }, []);

  return (
    <>
      <h2 className="mt-5 text-capitalize text-center" style={{color:'white',fontFamily:'cursive'}}>Top Destinations for your next vacations</h2>
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
{/* <div className="container-fluid position-relative">
<div className="row g-0">
  <div className="col-4 bgCarousel">
    <button
      className="btnPrev p-2"
      onClick={() => countDecrement()}
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="btnNext p-2"
      id="nextBtn"
      onClick={() => countIncrement()}
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Next</span>
    </button>

    <h1 className="countOfCard">0{count}</h1>
    <div className="progress stepBar">
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        aria-label="Warning example"
        style={{ width: `${progress}%` }}
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <div className="col-8">
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-touch="false"
      data-interval="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container text-center">
            <div className="row">
              { cardData.map((data) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <img
                        src={data.image}
                        class="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.country}</h5>
                        <p className="card-text">{data.description}</p>
                        <span>
                          <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                          <span>{data.rating}</span>
                        </span>
                        <div className="row mt-3">
                          <div className="col-6">
                            <span>Price</span>
                            <h4 style={{ color: "#F3941E" }}>
                              ${data.dicPrice}
                            </h4>
                          </div>
                          <div className="col-6">
                            <p class="text-decoration-line-through pt-4">
                              {data.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="container text-center">
            <div className="row">
              {cardDataTwo.map((data) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <img
                        src={data.image}
                        class="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.country}</h5>
                        <p className="card-text">{data.description}</p>
                        <span>
                          <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                          <span>{data.rating}</span>
                        </span>
                        <div className="row mt-3">
                          <div className="col-6">
                            <span>Price</span>
                            <h4 style={{ color: "#F3941E" }}>
                              ${data.dicPrice}
                            </h4>
                          </div>
                          <div className="col-6">
                            <p class="text-decoration-line-through pt-4">
                              {data.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="container text-center">
            <div className="row">
              {cardDataThree.map((data) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <img
                        src={data.image}
                        class="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.country}</h5>
                        <p className="card-text">{data.description}</p>
                        <span>
                          <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                          <span>{data.date}</span>
                          <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                          <span>{data.rating}</span>
                        </span>
                        <div className="row mt-3">
                          <div className="col-6">
                            <span>Price</span>
                            <h4 style={{ color: "#F3941E" }}>
                              ${data.dicPrice}
                            </h4>
                          </div>
                          <div className="col-6">
                            <p class="text-decoration-line-through pt-4">
                              {data.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */}