import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/UrlConfig";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import useFetch from "../../hook/useFetch";
import {getAllPackages} from "../../Redux/Actions/packageAction";

const Package = (props) => {
  const dispatch= useDispatch()
  const history = useHistory();
  const location = useLocation();
  const [packageDestination, setPackageDestination] = useState(
    location.state.state.packageDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [type, setType] = useState("");
  const { packages } = useSelector((state) => state.packagesReducer);
  console.log("pacla",packages)
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/api/all-packages?city=${packageDestination}&min=${
      min || 0
    }&max=${max || 99999}&type=${type || 'Full Day Tour'}`
  );
    useEffect(() => {
      dispatch(getAllPackages())
    }, [])
    

  const handleClick = () => {
    reFetch();
  };


  let tours = [
    {
      type: "Full Day Tour",
    },
    {
      type: "Half Day Tour",
    },
    {
      type: "One Day Tour",
    },
  ];

  let filters = [
    {
      title: "Cruises & Sailing",
      one: "Day Cruises",
      two: "Multi-day Cruises",
      three: "Sailing",
      four: "Sightseeing Cruises",
    },
    {
      title: "How to Get Around",
      one: "Air Tours",
      two: "Bike Rentals",
      three: "Bike Tours",
      four: "Buggy Rentals",
    },
    {
      title: "Tours by Duration",
      one: "Day Trips",
      two: "Full-day Tours",
      three: "Half-day Tours",
      four: "Multi-day Tours",
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar />
      {/* {packages && packages.map((item,index)=>{
         return(
          <div className="img-city">
          <div key={index}>
            <img style={{width:'100%',height:'100vh'}} src={ImageUrl(item.packageImages[0].img)} alt="Package img" />
          </div>
      </div>
        )})} */}
      <div className="bgCity"></div>
      <div className="container-fluid position-absolute top-100 introText">
        {/* Start of introduction of city */}
        <div className="row ms-4 mt-5">
          <div className="col-10 ms-5">
            <h1 className="lhrH1">{packageDestination}</h1>
            {/* <p className="lhrIntro mt-5">{product.description}</p> */}
          </div>
        </div>
        {/* End of introduction of city */}

        {/* Start of carousel cards */}
        <div
          id="carouselExampleControls"
          className="carousel slide my-5 container"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-0">
                {packages.map((tour) => {
                  return (
                    <div
                      className="col-2"
                      style={{
                        width: "auto",
                        margin: "0 auto",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="border border-primary p-2"
                        style={{ width: "fit-content" }}
                        key={tour}
                        onClick={(e) => setType(tour.type)}
                      >
                        <span className="text-dark">{tour.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row g-0">
                {packages.map((tour) => {
                  return (
                    <div
                      className="col-2"
                      style={{
                        width: "auto",
                        margin: "0 auto",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="border border-primary p-2"
                        style={{ width: "fit-content" }}
                        key={tour}
                        onClick={(e) => setType(tour.type)}
                      >
                        <span className="text-dark">{tour.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            style={{ width: "auto" }}
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark"
              aria-hidden="true"
              style={{ width: "26px", height: "26px" }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            style={{ width: "auto" }}
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark"
              aria-hidden="true"
              style={{ width: "26px", height: "26px" }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* End of carousel cards */}

        <div className="container-fluid">
          <div className="row">
            {/* Start of filters */}
            <div className="col-md-4">
              <Button variant="primary" onClick={handleShow}>
                <i class="fa-solid fa-bars me-2 fs-3"></i>{" "}
                <span className="fs-3">Filters</span>
              </Button>

              <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="col-12">
                    <div
                      style={{ backgroundColor: "#186B6D" }}
                      className="p-4 lsItem"
                    >
                      <p style={{ color: "white" }}>When are you traveling?</p>
                      {/* <input
                        className="form-control form-control-lg"
                        type="date"
                        placeholder=".form-control-lg"
                        aria-label=".form-control-lg example"
                      ></input> */}
                      <span
                        onClick={() => setOpenPackageDate(!openPackageDate)}
                      >{`${format(
                        dates[0].startDate,
                        "MM/dd/yyyy"
                      )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                      {openPackageDate && (
                        <DateRange
                          onChange={(item) => setDates([item.selection])}
                          minDate={new Date()}
                          ranges={dates}
                        />
                      )}
                    </div>

                    <div className="p-4">
                      <p className="fw-bold text-dark">Popular</p>
                      <div className="row">
                        <div className="form-check col-10">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Good for avoiding crowds
                          </label>
                        </div>
                        <div className="col-2">
                          <Tooltip
                            title="Search experiences that may have limited interaction with crowds."
                            placement="right"
                          >
                            <Button>
                              <i className="text-dark fs-5 fa-solid fa-circle-info"></i>
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-check col-10">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Taking safety measures
                          </label>
                        </div>
                        <div className="col-2">
                          <Tooltip
                            title="Search experiences with increased health and safety practices."
                            placement="right"
                          >
                            <Button>
                              <i className="text-dark fs-5 fa-solid fa-circle-info"></i>
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-check col-10">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            Virtual experiences
                          </label>
                        </div>
                        <div className="col-2">
                          <Tooltip
                            title="Search tours and activities you can do from home."
                            placement="right"
                          >
                            <Button>
                              <i className="text-dark fs-5 fa-solid fa-circle-info"></i>
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button text-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Tours, Sightseeing & Cruises
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          class="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            {/* filters */}
                            {filters.map((filter) => {
                              return (
                                <div class="accordion" id="accordionExample">
                                  <div class="accordion-item">
                                    <h2
                                      class="accordion-header"
                                      id="headingTwo"
                                    >
                                      <button
                                        class="accordion-button text-dark"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="true"
                                        aria-controls="collapseTwo"
                                      >
                                        {filter.title}
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseTwo"
                                      class="accordion-collapse collapse show"
                                      aria-labelledby="headingTwo"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div class="accordion-body">
                                        <ul class="list-group b-0">
                                          <li class="list-group-item border-0">
                                            <Link className="text-dark" to="/">
                                              {filter.one}
                                            </Link>
                                          </li>
                                          <li class="list-group-item border-0">
                                            <Link className="text-dark" to="/">
                                              {filter.two}
                                            </Link>
                                          </li>
                                          <li class="list-group-item border-0">
                                            <Link className="text-dark" to="/">
                                              {filter.three}
                                            </Link>
                                          </li>
                                          <li class="list-group-item border-0">
                                            <Link className="text-dark" to="/">
                                              {filter.four}
                                            </Link>
                                          </li>
                                        </ul>
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

                    <div className="p-4">
                      <label for="customRange3" class="form-label">
                        Price
                      </label>
                      <div className="row">
                        <div className="col-6">$0</div>
                        <div className="col-6 text-end">$500</div>
                      </div>
                      <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="5"
                        step="0.5"
                        id="customRange3"
                      ></input>
                    </div>

                    <div className="px-4">
                      <p className="fw-bold text-dark">Duration</p>
                      <ul class="list-group">
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Up to 1 hour
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              1 to 4 hours
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              4 hours to 1 day
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              1 to 3 days
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              3+ days
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4">
                      <p className="fw-bold text-dark">Time of Day</p>
                      <ul class="list-group">
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              6am—12pm
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              12pm—5pm
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              5pm—12am
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4">
                      <p className="fw-bold text-dark">Rating</p>
                      <ul class="list-group">
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star fs-5"
                              ></i>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4">
                      <p className="fw-bold text-dark">Specials</p>
                      <ul class="list-group">
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Deals & Discounts
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Free Cancellation
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Likely to Sell Out
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Skip-The-Line
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item border-0">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              Private Tour
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            {/* End of filters */}

            {/* Start of package cards */}
            <div className="col-md-8">
            
              {data.packages ?
                data.packages.map((data, index) => {
                  return (
                    <div class="card mb-3 p-4" key={index}>
                      <div class="row g-0">
                        <div class="col-md-4 position-relative">
                          <img
                            src={ImageUrl(data.packageImages[0].img)}
                            class="img-fluid rounded-start h-100"
                            alt="pic"
                          />
                          <div className="heartIcon">
                            <i class="fa-regular fa-heart fs-4 d-flex justify-content-center"></i>
                          </div>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <div className="row">
                              <div className="col-8">
                                <h5 class="card-title text-dark">
                                  {data.name}
                                </h5>
                              </div>
                              <div className="col-4 text-end">
                                <h5 class="card-title text-dark">
                                  ${data.price}
                                </h5>
                              </div>
                            </div>
                            {data.reviews.length > 0 && (
                              <p
                                className="text-data"
                                style={{ fontWeight: "bolder" }}
                              >
                                {data.ratings}/10 ({data.numOfReviews}){" "}
                                {data.numOfReviews >= 1 ? "Review" : "Reviews"}
                              </p>
                            )}
                            <small class="text-dark">
                              <div>
                                <i class="fa-regular fa-clock me-2"></i>
                                {data.duration}
                              </div>
                              <i class="fa-solid fa-check me-2"></i>
                              {data.refundable}
                            </small>
                            {/* <Link
                              to={`/${data._id}`}
                            > */}
                            <Button
                              onClick={function () {
                                dispatch({
                                  type: "NEW_SEARCH",
                                  payload: {
                                    packageDestination,
                                    dates,
                                    options,
                                  },
                                });
                                history.push(`/package/${data._id}`, {
                                  state: { packageDestination, dates, options },
                                });
                              }}
                              variant="contained"
                              style={{ float: "right" }}
                            >
                              Reserve
                            </Button>
                            {/* </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                : 'No Data Found'}

              {/* <nav aria-label="Page navigation example">
                <ul class="pagination d-flex justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
            {/* End of package cards */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Package;
