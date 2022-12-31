import "./CarDetail.css";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hook/useFetch";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../Components/Reserve/Reserve";
import { ImageUrl } from "../../Redux/UrlConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailList from "../../Components/MailList/MailList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewCard from "../HotelDetails/ReviewCard/ReviewCard";
import { clearErrors, newCarReview } from "../../Redux/Actions/carAction";
import { NEW_REVIEW_RESET } from "../../Redux/Constants/carConstants";
import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Container, Rating } from "@mui/material";

const CarDetail = ({match}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(location.state.state.dropoffTime);
  // const [options, setOptions] = useState(location.state.state.options);
  const [openCarReview, setOpenCarReview] = useState(false);
  const { success, error: reviewError } = useSelector(
    (state) => state.newCarReview
  );
  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/car-detail/${id}`
  );
  // console.log(data)
  const auth = useSelector((state) => state.auth);

  // const { user } = useContext(AuthContext);
  // const { date } = useContext(SearchContext);
  // console.log(date)
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

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

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
    if (auth.authenticate) {
      dispatch({ type: "NEW_SEARCH", payload: { startDestination,endDestination,pickupTime,dropoffTime, dates } });
      toast.success(`Booked Successfully`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push(`/car/${id}/checkout`,{
          state: { startDestination,endDestination,pickupTime,dropoffTime, dates },
        })
      }, 3000);
     
    } else {
      toast.error(`Booking is Failed please login first`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  };
  // console.log(data);
  if (Object.keys(data).length === 0) {
    return null;
  }
  const submitCarReviewToggle = () => {
    openCarReview ? setOpenCarReview(false) : setOpenCarReview(true);
  };
  const carReviewSubmitHandler = () => {
    if(auth.authenticate){

      const myForm = new FormData();
      
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("id", match.params.id);

    dispatch(newCarReview(myForm));
    // dispatch({type:GET_ALL_REVIEWS})
    
    setOpenCarReview(false);
    history.go(0)
  }else if(!localStorage.token){
    toast.error("Login First", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setOpenCarReview(false)
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
              Book Now!
            </button>
            <h1 className="hotelTitle">{data.car.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.car.mileage}</span>
            </div>
            <span className="hotelDistance">{data.car.title}</span>
            <span className="hotelPriceHighlight">
              Fare: PKR{data.car.fare}
            </span>
            <div className="hotelImages">
              {data.car.carImages?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <Zoom>
                    <img
                      // onClick={() => handleOpen(i)}
                      src={ImageUrl(photo.img)}
                      alt="images"
                      className="carImg"
                    />
                  </Zoom>
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                {/* <h1 className="hotelTitle">{data.hotel.title}</h1> */}
                <p className="hotelDesc">{data.car.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days} - day ride</h1>
                <span>
                  this property has an excellent location score of 9.8!
                </span>
                <h6>
                  <b>PKR{days * data.car.fare}</b> ({days} days)
                  <Tooltip title={`${data.car.fare} x ${days}`} placement="top">
                    <Button>
                      <i className="text-dark fs-5 fa-solid fa-circle-info"></i>
                    </Button>
                  </Tooltip>
                  <b className="my-2">From:</b> {startDestination}<br/>
                  <b className="my-2">To: </b> {endDestination}<br/>
                  <b className="my-2">pick-up Time</b> {pickupTime}<br/>
                  <b className="my-2">drop-off Time</b> {dropoffTime}<br/>
                </h6>
                <button onClick={handleClick}>Book Now!</button>
                <button onClick={submitCarReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
          {/* ----------------------------Review-Section-Start----------------------- */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={openCarReview}
            onClose={submitCarReviewToggle}
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
                onClick={submitCarReviewToggle}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={carReviewSubmitHandler}
                variant="outlined"
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <ToastContainer />
        

          <Container>
            {data.car.reviews && data.car.reviews[0] ? (
              <div className="reviews">
                {data.car.reviews &&
                  data.car.reviews.map((review) => (
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
      <Footer />
    </>
  );
};

export default CarDetail;
