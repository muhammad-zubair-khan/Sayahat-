import "./HotelDetail.css";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
import { Grid, Container } from "@mui/material";
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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailList from "../../Components/MailList/MailList";
const HotelDetail = () => {
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
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

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/hotel/${id}`
  );
  // const { user } = useSelector((state) => state.userAuth);
  // const { user } = useContext(AuthContext);
  // const { dates, options } = useContext(SearchContext);
  console.log(dates);
  console.log(options);
  console.log(destination);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
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
  console.log(data);
  if (Object.keys(data).length === 0) {
    return null;
  }
  // if (Object.keys(dates[0]).length === 0) {
  //   return null;
  // }
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
              </div>
            </div>
          </div>

          {/* ----------------------------Review-Section-Start----------------------- */}
          <Container className="my-2">
            <Grid container>
              <Grid xs={12} md={12}>
                <div className="accordion-item" style={{backgroundColor: 'silver',
    padding: '19px 19px'}}>
                  <h2 className="accordion-header" id="flush-headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                      style={{    color: 'black',
                        fontWeight: 'bolder',textAlign:'center'}}
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
                        <h6 style={{ fontSize: "13px", padding: "10px 0px" }}>
                          Write a Review
                        </h6>
                        <h6 style={{ fontSize: "13px", padding: "3px 0px" }}>
                          Name <span style={{ color: "red" }}>*</span>
                        </h6>
                        <input
                          style={{ width: "100%", outline: "none" }}
                          type="Name"
                          placeholder="Enyer your name"
                        />
                        <h6 style={{ fontSize: "13px", padding: "8px 0px" }}>
                          Email <span style={{ color: "red" }}>*</span>
                        </h6>
                        <input
                          style={{ width: "100%", ouline: "none" }}
                          type="Name"
                          placeholder="abc@example.com"
                        />
                        <br />
                        <h6
                          style={{
                            fontSize: "13px",
                            padding: "10px 0px",
                            paddingBottom: "0px",
                          }}
                        >
                          Ratings <span style={{ color: "red" }}>*</span>
                          <div className="rate">
                            <input
                              type="radio"
                              id="star5"
                              name="rate"
                              value="5"
                            />
                            <label for="star5" title="text">
                              5 stars
                            </label>
                            <input
                              type="radio"
                              id="star4"
                              name="rate"
                              value="4"
                            />
                            <label for="star4" title="text">
                              4 stars
                            </label>
                            <input
                              type="radio"
                              id="star3"
                              name="rate"
                              value="3"
                            />
                            <label for="star3" title="text">
                              3 stars
                            </label>
                            <input
                              type="radio"
                              id="star2"
                              name="rate"
                              value="2"
                            />
                            <label for="star2" title="text">
                              2 stars
                            </label>
                            <input
                              type="radio"
                              id="star1"
                              name="rate"
                              value="1"
                            />
                            <label for="star1" title="text">
                              1 star
                            </label>
                          </div>
                        </h6>
                        <h6
                          style={{
                            fontSize: "13px",
                            padding: "10px 0px",
                            paddingTop: "0px",
                          }}
                        >
                          Review Title <span style={{ color: "red" }}>*</span>
                        </h6>
                        <input
                          style={{ width: "100%", outline: "none" }}
                          type="Name"
                          placeholder="Give your review a title"
                        />
                        <h6 style={{ fontSize: "13px", padding: "10px 0px" }}>
                          Body of Review (1500){" "}
                          <span style={{ color: "red" }}>*</span>
                        </h6>
                        <textarea
                          style={{ width: "100%", outline: "none" }}
                          name="text"
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Write your comments here"
                        ></textarea>
                        <br />
                        {/* <!-- <input type="checkbox"> <label for="check">XS</label> --> */}
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
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
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
