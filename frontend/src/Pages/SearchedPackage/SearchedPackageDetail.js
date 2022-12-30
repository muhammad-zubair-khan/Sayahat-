import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import {
  getPackageBySlug,
  getPackageDetailById,
} from "../../Redux/Actions/packageAction";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { ImageUrl } from "../../Redux/UrlConfig";
import { Button } from "@mui/material";
import { format } from "date-fns";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { DateRange, DateRangePicker } from "react-date-range";
import {
  clearErrors,
  getAllPackageReviews,
  newPackageReview,
} from "../../Redux/Actions/packageAction";
import ReviewCard from "../HotelDetails/ReviewCard/ReviewCard";
import { NEW_REVIEW_RESET } from "../../Redux/Constants/packageConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Container, Rating } from "@mui/material";

function SearchedPackageDetail({ match }) {
  const [showResults, setShowResults] = useState(false);
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [time, setTime] = useState("");
  const [buttonText, setButtonText] = useState("Check Availability");
  const onClickHandle = () => {
    setTimeout(() => setShowResults(true), 1000);
    setButtonText("Update Dates");
  };
  const [packageDestination, setPackageDestination] = useState(
    location.state.state.packageDestination
  );
  const [openPackageDate, setOpenPackageDate] = useState(false);
  const [dates, setDates] = useState(location.state.state.dates);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(location.state.state.options);
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increament" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const auth = useSelector((state) => state.auth);
  // const id = location.pathname.split("/")[2];

  const bookPackage = () => {
    if (auth.authenticate) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { packageDestination, dates, options },
      });
      toast.success(`Done! please wait`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push(`/package/${id}/checkout`, {
          state: { packageDestination, dates, time, options },
        });
      }, 3000);
    } else {
      toast.error(`You have to login first!`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  };
  const submitPackageReviewToggle = () => {
    openPackageReview
      ? setOpenPackageReview(false)
      : setOpenPackageReview(true);
  };
  const packageReviewSubmitHandler = () => {
    if(auth.authenticate){

      const myForm = new FormData();
      
      myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("id", match.params.id);

    dispatch(newPackageReview(myForm));
    // dispatch({type:GET_ALL_REVIEWS})

    setOpenPackageReview(false);
    history.go(0);
  }else{
    toast.error("Login First", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setOpenPackageReview(false)
    setTimeout(() => {
      history.push('/login')
    }, 3000);
  }
  };

  const Results = () => (
    <div
      id="results"
      className="search-results"
      style={{
        border: " 1px solid black",
        backgroundColor: "#d9dae0",
        padding: "17px 31px",
        margin: "36px 1px",
      }}
    >
      <div className="mt-3" style={{ fontWeight: "bold" }}>
        {packages.package.name}
      </div>
      <p className="mb-2">{packages.package.description}</p>
      <div>
        <b>Available Time</b> <br />
        {packages.package.startTime.map((item, index) => {
          const handleShow = () => {
            setShow(true);
          };
          return (
            <>
              <input
                key={index}
                type="radio"
                value={item}
                onChange={(e) => setTime(e.target.value)}
                name="time"
                onClick={handleShow}
                style={{ margin: "14px 13px" }}
              />
              {item}

              {/* {show && (
              <>
                <p>{packages.package.name}</p>
                <p>{packages.package.description}</p>
                <p>
                  Free Cancellation Untill{" "}
                  <span className="siTaxiOp">
                    {`${format(dates[0].startDate - 2, "MM/dd/yyyy")} `}
                  </span>{" "}
                </p>

                <Button variant="contained">Book Now</Button>
              </>
            )} */}
            </>
          );
        })}
      </div>

      <Button variant="contained" className="my-3" onClick={bookPackage}>
        Book Now
      </Button>
    </div>
  );
  const params = useParams();
  //   console.log(params);
  let { id } = useParams();

  const dispatch = useDispatch();
  const packages = useSelector((state) => state.addPackageReducer);

  // console.log("pack", packages.package.packageImages);
  // console.log("picc>>>>>>>>",packages.package.packageImage)
  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);
  // const {packages} = useSelector((state) => state.packagesReducer);
  // console.log(packages)
  // const {product} = useSelector((state) => state.newVacation);
  // console.log("products>>>", product);
  const [openPackageReview, setOpenPackageReview] = useState(false);
  const { success, error: reviewError } = useSelector(
    (state) => state.newPackageReview
  );
  useEffect(() => {
    // if (error) {
    //   toast.error(error, {
    //     position: toast.POSITION.BOTTOM_CENTER,
    //   });
    //   dispatch(clearErrors());
    // }

    if (reviewError) {
      toast.error(reviewError, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, reviewError, success]);

  let pictures = [
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/e1/ed/7d.jpg",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/e1/ed/7d.jpg",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/e1/ed/7d.jpg",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/e1/ed/7d.jpg",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/0c/e1/ed/7d.jpg",
    },
  ];

  let reviews = [
    {
      title: "Poor customer service",
      name: "Martha_B",
      date: "Dec 2022",
      comment:
        "Was ill at the last minute and try to reschedule for the following night. We were told that we could not reschedule and would lose our money. Obviously, we lost our money because we were sick and could not go. We did not ask for a refund we simply asked for a reschedule.",
    },
    {
      title: "Nigh bus tour",
      name: "Will_R",
      date: "Oct 2022",
      comment:
        "The bus tour was a lot of fun however they pick you up and then head straight to the Excalibur for a bathroom break. That’s the only one, the night time tour needs another stop up by Fremont st for a bathroom break. Everyone on the bus ran off trying to find a bathroom when we finally got done.",
    },
    {
      title: "A must do in Vegas",
      name: "Torie_L",
      date: "Oct 2022",
      comment:
        "Had a great couple of hours seeing vegas at night, our tour guide and bus driver were excellent great knowledge. Got to stop off at the vegas sign for amazing pictures.",
    },
    {
      title: "Great way to see the sites",
      name: "Rick_L",
      date: "Sep 2022",
      comment:
        "Learned a lot about Vegas and got to see all the sites!Was fun hearing about movies filmed here and about downtown.",
    },
    {
      title: "Okay tour, but too long",
      name: "Randy_S",
      date: "Aug 2022",
      comment:
        "It was interesting at first but then went a bit downhill. The biggest issue was it was simply too long. They tried to stretch a 60-minute tour into 90+ minutes.",
    },
  ];
  if (Object.keys(packages.package).length === 0) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="bgPackage"></div>
      {/* start of page */}
      <div className="container aboutPackage">
        {/* start of package images and price */}
        <div className="row">
          <h3 className="text-black">{packages.package.name}</h3>
          <div class="col-2" style={{ height: "fit-content" }}>
            {packages.package.packageImages &&
              packages.package.packageImages.map((pic, index) => {
                return (
                  <img
                    src={ImageUrl(pic.img)}
                    alt="Girl in a jacket"
                    className="p-1"
                    width="80%"
                    height="16%"
                  />
                );
              })}
          </div>
          <div className="col-6">
            <Zoom>
              <img
                src={ImageUrl(packages.package.packageImages[0].img)}
                className=""
                width="100%"
                height=""
                alt=""
              />
            </Zoom>
          </div>

          <div className="col-4 BgPackage p-3 h-100">
            <h4 className="text-black">From ${packages.package.price}</h4>
            <span style={{ color: "#1874A2" }}>Lowest Price Guarantee</span>
            <hr />
            <h4 className="text-black">Select Date and Travelers</h4>
            <div className="p-4 lsItem">
              <span
                onClick={() => setOpenPackageDate(!openPackageDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openPackageDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div
              className=" col-xxs-12 col-xs-6 mt"
              style={{ textAlign: "center" }}
            >
              <section>
                <span
                  style={{
                    color: "#0000000",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  <input
                    type="text"
                    className="form-control mt-2"
                    disabled
                    style={{ cursor: "pointer" }}
                    placeholder={`${options.adult} Adult - ${options.children} Children`}
                  />
                </span>
                {openOptions && (
                  <div
                    className="options"
                    style={{
                      position: "absolute",
                      // top: "275px",
                      top: "316px",
                      width: "31%",
                      zIndex: "1000000",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px #848484",
                      padding: "7px 10px",
                    }}
                  >
                    <span>You can select up to 15 travelers in total.</span>
                    <div className="optionItems">
                      <span
                        style={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Adult
                      </span>
                      <div className="optionButton">
                        <button
                          className="optionbtn"
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "decreament")}
                        >
                          -
                        </button>
                        <span
                          style={{
                            color: "black",
                            fontSize: "14px",
                          }}
                        >
                          {options.adult}
                        </span>
                        <button
                          className="optionbtn"
                          style={{ marginRight: "1px" }}
                          onClick={() => handleOption("adult", "increament")}
                          disabled={options.adult >= 15}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems">
                      <span
                        style={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Children
                      </span>
                      <div className="optionButton">
                        <button
                          className="optionbtn"
                          disabled={options.children <= 0}
                          onClick={() => handleOption("children", "decreament")}
                        >
                          -
                        </button>
                        <span
                          style={{
                            color: "black",
                            fontSize: "14px",
                          }}
                        >
                          {options.children}
                        </span>
                        <button
                          className="optionbtn"
                          onClick={() => handleOption("children", "increament")}
                          disabled={
                            options.children >= 15 && options.adult >= 15
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* <div className="optionItems">
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Room
                                    </span>
                                    <div className="optionButton">
                                      <button
                                        className="optionbtn"
                                        style={{ marginRight: "3px" }}
                                        disabled={options.room <= 1}
                                        onClick={() =>
                                          handleOption("room", "decreament")
                                        }
                                      >
                                        -
                                      </button>
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {options.room}
                                      </span>
                                      <button
                                        className="optionbtn"
                                        onClick={() =>
                                          handleOption("room", "increament")
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div> */}
                  </div>
                )}
              </section>
            </div>

            <button
              type="button"
              className="btn btn-danger w-100 mt-4 p-2 mb-4"
              onClick={onClickHandle}
              id="availabilitybtn"
            >
              {buttonText}
            </button>
            
            <small className="fw-bold">Reserve Now & Pay Later</small>
            <br />
            <small>Secure your spot while staying flexible</small>
            <br />
            <small className="fw-bold">{packages.package.refundable}</small>
            <br />
            {/* <small>Up to 24 hours in advance.Learn more</small> */}
            <button
              onClick={submitPackageReviewToggle}
              className="submitReview"
            >
              Submit Review
            </button>
          </div>
        </div>
        {/* end of package images and price */}

        {/* return !spinner && <div>Your content</div>; */}
        <>
          {!showResults ? (
            <div style={{ display: "none" }}>loading</div>
          ) : (
            <Results />
          )}
        </>
        <div className="row">
          {/* start of detials about package */}
          <h3 className="text-black fw-bold">Overview</h3>
          <p className="text-black">{packages.package.description}</p>
          {/* <ul className="text-black ms-5">
            <li>
              Viator Exclusive Las Vegas late-night tour isnt available anywhere
              else
            </li>
            <li className="mt-3">
              A prime viewing location—see the Las Vegas Strip from an open-top
              bus
            </li>
            <li className="mt-3">
              A guide shares stories about the city as you take in the bright
              lights
            </li>
            <li className="mt-3">
              Stop at the Welcome to Fabulous Las Vegas Sign for fun photo ops
            </li>
          </ul> */}
          <hr />
          <h3 className="text-black fw-bold my-4">What's Included</h3>
          <div className="row">
            <div className="col-4">
              <span>
                <i class="fa-solid fa-check"></i>
                {packages.package.duration}
              </span>
            </div>
            <div className="col-4">
              <span>
                <i class="fa-solid fa-check"></i> 1 Route - Las Vegas Viator
                Late Night Tour
              </span>
            </div>
            <div className="col-4">
              <span>
                <i class="fa-solid fa-xmark"></i> Hotel pickup and drop-off
              </span>
            </div>
          </div>
          <span className="mt-3">
            <i class="fa-solid fa-check"></i> Live English guide
          </span>
          <span className="mt-3">
            <i class="fa-solid fa-check"></i> Night Tour of Las Vegas on
            double-decker bus
          </span>
          <span className="mt-3 mb-4">
            <i class="fa-solid fa-check"></i> 1 Stop for a Photo opportunity at
            the Las Vegas Sign
          </span>
          <hr />

          <h3 className="text-black fw-bold my-4">Meeting And Pickup</h3>
          <h6 className="text-black fw-bold mb-3">Meeting point</h6>
          <span>3973 Linq Ln3973 Linq Ln, Las Vegas, NV 89109, USA</span>

          <h6 className="text-black fw-bold my-3">Start time</h6>
          <span>10:15 PM</span>

          <h6 className="text-black fw-bold my-3">End point</h6>
          <span>This activity ends back at the meeting point.</span>

          <hr />

          <h3 className="text-black fw-bold my-4">What To Expect</h3>
          <ul className="ms-5">
            <li className="text-black">
              <span className="fw-bold">High Roller</span>
              <p className="text-muted my-2">
                This 550-foot-tall Ferris wheel with observation cabins offers
                city views and holds up to 40 people.
              </p>
            </li>
            <li className="text-black">
              <span className="fw-bold">Fountains of Bellagio</span>
              <p className="text-muted my-2">
                Soaring, iconic fountains featuring dramatic aquatic shows
                choreographed with music and lights.
              </p>
            </li>
            <li className="text-black">
              <span className="fw-bold">
                Welcome to Fabulous Las Vegas Sign
              </span>
              <p className="text-muted my-2">
                Iconic 1950s neon sign and popular photo op marking the southern
                end of the Las Vegas Strip. Where we will get off the bus for up
                to 30 minutes for a photo opportunity.
              </p>
            </li>
            <li className="text-black">
              <span className="fw-bold">Madame Tussauds - Las Vegas</span>
              <p className="text-muted my-2">
                Museum chain for life-size wax replicas of famous Americans and
                historic icons in themed galleries.
              </p>
            </li>
            <li className="text-black">
              <span className="fw-bold">Eiffel Tower Viewing Deck</span>
              <p className="text-muted my-2">
                460-foot-high observation deck atop Paris Las Vegas' half-scale
                replica of the Eiffel Tower.
              </p>
            </li>
            <li className="text-black">
              <span className="fw-bold">MGM Grand Arena</span>
              <p className="text-muted my-2">Hotel</p>
            </li>
          </ul>

          <hr />

          <h3 className="text-black fw-bold my-4">Additional Info</h3>
          <div className="row">
            <div className="col-6">
              <ul className="text-black ms-5">
                <li>Confirmation will be received at time of booking</li>
                <li className="mt-3">Service animals allowed</li>
                <li className="mt-3">Stroller accessible</li>
                <li className="mt-3">Wheelchair accessible</li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="text-black ms-5">
                <li>
                  Please advise at time of booking if wheelchair assistance is
                  required
                </li>
                <li className="mt-3">Most travelers can participate</li>
                <li className="mt-3">
                  A guide shares stories about the city as you take in the
                  bright lights
                </li>
                <li className="mt-3">
                  Night Tour is not a hop-on hop-off tour
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <h3 className="text-black fw-bold my-4">Cancellation Policy</h3>
          <p className="text-black">
            You can cancel up to 24 hours in advance of the experience for a
            full refund.
          </p>
          <div className="row">
            <div className="col-6">
              <ul className="text-black ms-5">
                <li>
                  For a full refund, you must cancel at least 24 hours before
                  the experiences start time.
                </li>
                <li className="mt-3">
                  If you cancel less than 24 hours before the experiences start
                  time, the amount you paid will not be refunded.
                </li>
                <li className="mt-3">
                  Any changes made less than 24 hours before the experiences
                  start time will not be accepted.
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="text-black ms-5">
                <li>Cut-off times are based on the experiences local time.</li>
                <li className="mt-3">
                  This experience requires good weather. If its canceled due to
                  poor weather, youll be offered a different date or a full
                  refund.
                </li>
              </ul>
            </div>
          </div>

          <hr />
          {/* end of detials about package */}

          {/* start of package reviews */}
          {/* ----------------------------Review-Section-Start----------------------- */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={openPackageReview}
            onClose={submitPackageReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent
              className="submitDialog"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                required
                className="submitDialogTextArea"
                cols="40"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={submitPackageReviewToggle}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={packageReviewSubmitHandler}
                variant="outlined"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <ToastContainer />
          {/* <Container className="my-2">
            <Grid container>
              <Grid xs={12} md={12}>
                <div
                  className="accordion-item"
                  style={{ backgroundColor: "silver", padding: "19px 19px" }}
                >
                  <h2 className="accordion-header" id="flush-headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                      style={{
                        color: "black",
                        fontWeight: "bolder",
                        textAlign: "center",
                      }}
                    >
                      Give your Review
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div
                        className="wrape1"
                        style={{ fontSize: "11px", color: "#777" }}
                      >
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        />
                        <textarea
                          className="submitDialogTextArea"
                          cols="30"
                          rows="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                          style={{
                            float: "right",
                            position: "relative",
                            bottom: "8px",
                            backgroundColor: "black",
                            color: "white",
                            border: "1px solid",
                            padding: "8px 9px",
                            fontSize: "small",
                            marginTop: "6px",
                          }}
                          onClick={reviewSubmitHandler}
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container> */}

          <Container>
            {packages.package.reviews && packages.package.reviews[0] ? (
              <div className="reviews">
                {packages.package.reviews &&
                  packages.package.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                    // {/* <img src={profilePng} alt="User" /> */}
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Container>

          {/* ----------------------------Review-Section-End----------------------- */}

          {/* start of package reviews */}
        </div>
      </div>

      {/* end of page */}

      <Footer />
    </>
  );
}

export default SearchedPackageDetail;
