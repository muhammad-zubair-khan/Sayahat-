import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Button from "@mui/material/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/UrlConfig";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
// import useFetch from "../../hook/useFetch";
import { getAllPackages } from "../../Redux/Actions/packageAction";
import { Slider, Typography } from "@mui/material";

const Package = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [packageDestination, setPackageDestination] = useState(
    location.state.state.packageDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [type, setType] = useState("");
  const [price, setPrice] = useState([0, 95000]);
  const [ratings, setRatings] = useState(0);
  const { packages } = useSelector((state) => state.packagesReducer);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  // const [minRat, setMinRat] = useState(undefined);
  // const [maxRat, setMaxRat] = useState(undefined);

  // const { data, loading, error, reFetch } = useFetch(
  //   `http://localhost:5000/api/all-packages?city=${packageDestination}&min=${
  //     min || 0
  //   }&max=${max || 99999}&type=${type || "Full Day Tour"}`
  // );
  useEffect(() => {
    dispatch(getAllPackages(type, min, max, packageDestination, ratings));
  }, [dispatch, type, min, max, packageDestination, ratings]);

  // const handleClick = () => {
  //   reFetch();
  // };

  const types = [
    "Full Day Tour",
    "Half Day Tour",
    "One Day Tour",
    "Private Tour",
    "Group Tour",
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar />
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
                {types.map((type) => {
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
                        className="p-2"
                        style={{
                          width: "fit-content",
                          border: "1px solid #d4d4d4",
                          borderRadius: "16px",
                        }}
                        key={type}
                        onClick={(e) => setType(type)}
                      >
                        <span className="text-dark">{type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row g-0">
                {types.map((type) => {
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
                        className="p-2"
                        style={{
                          width: "fit-content",
                          border: "1px solid #d4d4d4",
                          borderRadius: "16px",
                        }}
                        key={type}
                        onClick={(e) => setType(type)}
                      >
                        <span className="text-dark">{type}</span>
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
                      <div className="lsOptionItem">
                        <span
                          className="lsOptionText"
                          style={{ color: "black" }}
                        >
                          Min price
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMin(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span
                          className="lsOptionText"
                          style={{ color: "black" }}
                        >
                          Max price
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMax(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <fieldset>
                        <Typography component="legend">
                          Ratings Above
                        </Typography>
                        <Slider
                          value={ratings}
                          onChange={(e, newRating) => {
                            setRatings(newRating);
                          }}
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          default={packages.map((item) => {
                            return item.ratings;
                          })}
                          min={0}
                          max={5}
                        />
                      </fieldset>
                    </div>

                    {/* <div className="p-4">
                    <div className="lsOptionItem">
                        <span
                          className="lsOptionText"
                          style={{ color: "black" }}
                        >
                          Max Rating
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setRatings(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                    </div> */}

                    <div className="px-4">
                      <p className="fw-bold text-dark">Duration</p>
                      <ul class="list-group">
                        {packages.map((item) => {
                          return (
                            <>
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
                                    {item.duration}
                                  </label>
                                </div>
                              </li>
                            </>
                          );
                        })}
                        {/* <li class="list-group-item border-0">
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
                        </li> */}
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
              {packages
                ? packages.map((data, index) => {
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
                                  <h5 class="card-title text-dark" style={{fontWeight:'bolder'}}>
                                    PKR {data.price}
                                  </h5>
                                </div>
                              </div>
                              {data.reviews.length > 0 ? (
                                <p
                                  className="text-data"
                                  style={{ fontWeight: "bolder",fontSize:'small' }}
                                >
                                  {data.ratings}/5 ({data.numOfReviews}){" "}
                                  {data.numOfReviews >= 1
                                    ? "Review"
                                    : "Reviews"}
                                </p>
                              ) : (
                                <p style={{ fontSize: "small" }}>
                                  No Reviews
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
                                    state: {
                                      packageDestination,
                                      dates,
                                      options,
                                    },
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
                : "No Data Found"}

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
