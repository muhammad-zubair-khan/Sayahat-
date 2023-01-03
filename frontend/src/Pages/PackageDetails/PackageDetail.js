import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import "./StylePackage.css";
import {
  getPackageBySlug,
  getPackageDetailById,
  newPackageReview,
} from "../../Redux/Actions/packageAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ImageUrl } from "../../Redux/UrlConfig";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import ReviewCard from "../HotelDetails/ReviewCard/ReviewCard";
function PackageDetail({match}) {
  const history = useHistory()
  const location = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [show, setShow] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openPackageDate, setOpenPackageDate] = useState(false);

  const [time, setTime] = useState("");
  const onClickHandle = () => {
    setShowResults(true);
  };
  // const Results = () => (
  //   <div id="results" className="search-results">
  //     {packages.package.startTime.map((item, index) => {
  //       const handleShow = () => {
  //         setShow(true);
  //       };
  //       return (
  //         <>
  //           <input
  //             key={index}
  //             type="radio"
  //             value={item}
  //             onChange={(e) => setTime(e.target.value)}
  //             name="time"
  //             onClick={handleShow}
  //             style={{ margin: "14px 13px" }}
  //           />
  //           {item}
  //         </>
  //       );
  //     })}
  //   </div>
  // );
  const auth = useSelector((state) => state.auth);
  
  const bookPackage = () => {
    if (auth.authenticate) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { dates, options },
      });
      toast.success(`Confirming! please wait`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push(`/package/${id}/checkout`, {
          state: { dates, time, options },
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
  }else if(!localStorage.token){
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
  
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increament" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const params = useParams();
  let { id } = useParams();

  const dispatch = useDispatch();
  const packages = useSelector((state) => state.addPackageReducer);
  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);

  const [openPackageReview, setOpenPackageReview] = useState(false);
  const { success, error: reviewError } = useSelector(
    (state) => state.newPackageReview
  );

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
            <img
              src={ImageUrl(packages.package.packageImages[0].img)}
              className=""
              width="100%"
              height=""
              alt=""
            />
          </div>
          <div className="col-4 BgPackage p-3 h-100">
            <h4 className="text-black">From PKR {packages.package.price}</h4>
            <span style={{ color: "#1874A2" }}>Lowest Price Guarantee</span>
            <hr />
            <h4 className="text-black">Select Date and Travelers</h4>
            <span
              onClick={() => setOpenPackageDate(!openPackageDate)}
              style={{cursor:'pointer'}}
            >
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}
            </span>
            {openPackageDate && (
              <DateRange
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />
            )}
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
                      // top: "253px",
                      top: "275px",
                      // width: "16%",
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
                  </div>
                )}
              </section>
            </div>

            <button
              type="button"
              className="btn btn-danger w-100 mt-4 p-2 mb-4"
              onClick={onClickHandle}
              disabled={!dates || !options.adult}
            >
              Check Availability
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
        <div>{showResults ? <Results /> : null}</div>
        {/* end of package images and price */}
        <div className="row">
          {/* start of detials about package */}
          <h3 className="text-black fw-bold">Overview</h3>
          <p className="text-black">{packages.package.description}</p>
    
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



        </div>
      </div>

      {/* end of page */}

      <Footer />
    </>
  );
}

export default PackageDetail;
