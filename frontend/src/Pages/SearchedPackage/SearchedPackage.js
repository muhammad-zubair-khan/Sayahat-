import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Button from "@mui/material/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/UrlConfig";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { getAllPackages } from "../../Redux/Actions/packageAction";
import { Box, Slider, Typography } from "@mui/material";
import MetaData from "../../Components/MetaData/MetaData";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
// import {
//   addToFavorites,
//   removeFromFavorites,
// } from "../../Redux/Actions/favourtieAction";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Package = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [packageDestination] = useState(
    location.state.state.packageDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options] = useState(location.state.state.options);
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [type, setType] = useState("");
  const { packages, loading } = useSelector((state) => state.packagesReducer);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [ratings, setRatings] = useState(0);
  // const [hotels,setHotels] = (packages);
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    dispatch(getAllPackages(type, min, max, packageDestination, ratings));
  }, [dispatch, type, min, max, packageDestination, ratings]);
  const getTrips = async () => {
    const response = await axios("http://localhost:5000/api/trips", {
      method: "GET",
    });
    setTrips(response.data.trips);
  };

  useEffect(() => {
    getTrips();
  }, []);
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
  const handleChange = (event) => {
    setRatings(event.target.value);
  };

  const { favorites } = useSelector((state) => state.addTofavorite);
  const [packageId, setPackageId] = useState("");
  const handleToggleFavorites = (itemId) => {
    setOpen(true);
    setPackageId(itemId);
    console.warn(itemId);
    // dispatch(addToFavorites(itemId));

    // if (favorites.includes(itemId)) {
    //   dispatch(removeFromFavorites(itemId));
    //   console.warn("KKK",favorites);
    // } else {
    // }
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleAddToFavorites = () => {
    // Make a POST request to the server to add the hotel to the favorites list
    axios("http://localhost:5000/api/save/favourite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId }),
    })
      .then((res) => res.json())
      .then((trip) => {
        // Update the local state to reflect the added hotel
        this.setState({ trips: [...this.state.trips, trip] });
      })
      .catch((error) => {
        console.error("Error adding hotel to favorites:", error);
      });
  };

  const addtoFavourite = () => {
    // dispatch(addToFavorites(PackageId));
    handleAddToFavorites();
    console.warn("packageId", packageId);
  };
  return (
    <>
      <MetaData title={`Packages of ${packageDestination} from Sayahat`} />
      <Navbar />
      <div className="bgCity"></div>
      <div className="container-fluid position-absolute top-100 introText">
        {/* Start of introduction of city */}
        <div className="row ms-4 mt-5">
          <div className="col-10 ms-5">
            <h1 className="lhrH1">{packageDestination}</h1>
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
                          min={0}
                          max={5}
                          value={ratings}
                          onChange={handleChange}
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
            {!loading ? (
              <>
                {packages.length === 0 ? (
                  <p
                    className="col-md-8"
                    style={{ textAlign: "center", marginTop: "100px" }}
                  >
                    No data found.
                  </p>
                ) : (
                  <>
                    <div className="col-md-8">
                      {packages
                        ? packages.map((data, index) => {
                            return (
                              <div class="card mb-3 p-4" key={data._id}>
                                <div className="row g-0">
                                  <div className="col-md-4 position-relative">
                                    <img
                                      src={ImageUrl(data.packageImages[0].img)}
                                      class="img-fluid rounded-start h-100"
                                      alt="pic"
                                    />
                                    <div
                                      className="heartIcon"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <button
                                        onClick={() =>
                                          handleToggleFavorites(data._id)
                                        }
                                      >
                                        {favorites.includes(data._id)
                                          ? "Remove from"
                                          : "Add to"}{" "}
                                        favorites
                                      </button>
                                    </div>
                                  </div>
                                  {open && (
                                    <div>
                                      <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open}
                                        onClose={handleCloseModal}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                          timeout: 500,
                                        }}
                                      >
                                        <Fade in={open}>
                                          <Box sx={style}>
                                            <Typography
                                              id="transition-modal-description"
                                              sx={{ mt: 2 }}
                                            >
                                              Your Trips
                                            </Typography>

                                            {trips &&
                                              trips.map((data) => {
                                                return (
                                                  <>
                                                    <div
                                                      style={{
                                                        border:
                                                          "1px solid rgb(212 211 211)",
                                                        padding: "9px 9px",
                                                        margin: "14px 0px",
                                                        display: "flex",
                                                        justifyContent:
                                                          "space-between",
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={addtoFavourite}
                                                    >
                                                      <span>{data.name}</span>
                                                      <span id="getsavetext">
                                                        save
                                                      </span>
                                                    </div>
                                                  </>
                                                );
                                              })}
                                            <div></div>

                                            <br />
                                          </Box>
                                        </Fade>
                                      </Modal>
                                    </div>
                                  )}
                                  <div className="col-md-8">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-8">
                                          <h5 class="card-title text-dark">
                                            {data.name}
                                          </h5>
                                        </div>
                                        <div className="col-4 text-end">
                                          <h5
                                            class="card-title text-dark"
                                            style={{ fontWeight: "bolder" }}
                                          >
                                            PKR {data.price}
                                          </h5>
                                        </div>
                                      </div>
                                      {data.reviews.length > 0 ? (
                                        <p
                                          className="text-data"
                                          style={{
                                            fontWeight: "bolder",
                                            fontSize: "small",
                                          }}
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
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Box className="col-md-8 mt-5" style={{ textAlign: "center" }}>
                  Loading... &nbsp;
                  <CircularProgress />
                </Box>
              </>
            )}

            {/* End of package cards */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Package;
