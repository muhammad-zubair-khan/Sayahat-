import "./HotelDetail.css";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Grid, Container, Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useSelector } from "react-redux";
// import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../Components/Reserve/Reserve";
import { ImageUrl } from "../../Redux/UrlConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Tooltip from "@mui/material/Tooltip";
import MailList from "../../Components/MailList/MailList";
import { useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  newReview,
} from "../../Redux/Actions/hotelAction";
import ReviewCard from "./ReviewCard/ReviewCard";
import { NEW_REVIEW_RESET } from "../../Redux/Constants/hotelConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelDetail = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // const [rating,setRating] = useState(0)
  // console.log(id)
  // console.log("location>>",location)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dates, setDates] = useState(location.state.state.dates);
  const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const [options, setOptions] = useState(location.state.state.options);
  const [openReview, setOpenReview] = useState(false);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // const auth = useSelector((state) => state.auth);

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/hotel/${id}`
  );

  const auth = useSelector((state) => state.auth);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

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
  }, [dispatch, error, reviewError, success]);
  // useEffect(() => {
  //   window.localStorage.setItem("endDate", dates[0].endDate);
  //   window.localStorage.setItem("startDate", dates[0].startDate);
  // }, [dates]);
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  // console.log(options)
  // console.log(parseInt(localStorage.getItem('endDate')))

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    // if (!user) {
    setOpenModal(true);
    // } else {
    //   history.push("/login");
    // }
  };

  if (Object.keys(data).length === 0) {
    return null;
  }
  // if (Object.keys(dates[0]).length === 0) {
  //   return null;
  // }
  const submitReviewToggle = () => {
    openReview ? setOpenReview(false) : setOpenReview(true);
  };
  const reviewSubmitHandler = () => {
    if(auth.authenticate){
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("id", match.params.id);

    dispatch(newReview(myForm));
    // dispatch({type:GET_ALL_REVIEWS})

    setOpenReview(false);
    history.go(0)
  }else if(!localStorage.token){
    toast.error("Login First", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setOpenReview(false)
    setTimeout(() => {
      history.push('/login')
    }, 3000);
  }
  };

  return (
    <>
      <div style={{ background: "rgb(0, 0, 0)", height: "75px" }}>
        <Navbar />
      </div>
      {/* <Navbar />
      <Header type="list" /> */}
      {loading ? (
        "loading"
      ) : (
        <div
          className="hotelContainer"
          style={{ top: "126px", position: "relative" }}
        >
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.hotel.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.hotel.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.hotel.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.hotel.cheapestPrice} at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.hotel.hotelImages?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <Zoom>
                    <img
                      // onClick={() => handleOpen(i)}
                      src={ImageUrl(photo.img)}
                      alt="images"
                      className="hotelImg"
                    />
                  </Zoom>
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.hotel.title}</h1>
                <p className="hotelDesc">{data.hotel.description}</p>
                <p className="siTaxiOp">
                  {data.hotel.pool ? `Pool is ${data.hotel.pool}` : " "}
                </p>
                <p className="siTaxiOp">
                  {data.hotel.Breakfast
                    ? `Breakfast is ${data.hotel.Breakfast}`
                    : " "}
                </p>
                <p className="siTaxiOp">
                  {data.hotel.Hottub ? `HotTub is ${data.hotel.Hottub}` : " "}
                </p>
                <p className="siTaxiOp" style={{ padding: "0px" }}>
                  {data.hotel.FullyRefundable
                    ? `${data.hotel.FullyRefundable}`
                    : " "}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  this property has an excellent location score of 9.8!
                </span>
                <h6>
                  <b>PKR{days * data.hotel.cheapestPrice * options.room}</b> (
                  {days} nights)
                  <Tooltip
                    title={`${data.hotel.cheapestPrice} x ${days} and ${options.adult} Adults - ${options.children} Childrens - ${options.room} Rooms`}
                    placement="top"
                  >
                    <Button>
                      <i className="text-dark fs-5 fa-solid fa-circle-info"></i>
                    </Button>
                  </Tooltip>
                </h6>
                <button onClick={handleClick}>Reserve or Book Now!</button>
                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------Review-Section-Start----------------------- */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={openReview}
            onClose={submitReviewToggle}
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
                onClick={submitReviewToggle}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={reviewSubmitHandler}
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
            {data.hotel.reviews && data.hotel.reviews[0] ? (
              <div className="reviews">
                {data.hotel.reviews &&
                  data.hotel.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                    // {/* <img src={profilePng} alt="User" /> */}
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Container>

          {/* ----------------------------Review-Section-End----------------------- */}

          <MailList />
          {/* <Footer /> */}
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      <Footer />
    </>
  );
};

export default HotelDetail;
