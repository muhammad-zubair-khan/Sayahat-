import "./HotelDetail.css";
// import MailList from "../../components/mailList/MailList";
// import Footer from "../../components/footer/Footer";
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
  console.log(id)
  console.log("location>>",location)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/hotel/${id}`
  );
  const { user } = useSelector((state) => state.userAuth);
  // const { user } = useContext(AuthContext);
  // const { dates, options } = useContext(SearchContext);
  console.log(dates);
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
    if (!user) {
      setOpenModal(true);
    } else {
      history.push("/login");
    }
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
