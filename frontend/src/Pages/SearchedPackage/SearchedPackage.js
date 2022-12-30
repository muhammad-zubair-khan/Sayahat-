import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
// import "./StyleCity.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { getPackageBySlug } from "../../Redux/Actions/packageAction";
// import { getProductDetailById } from "../../Redux/Actions/vacationProductAction";
import { getDestinationDetailById } from "../../Redux/Actions/topDestinationAction";
import { ImageUrl } from "../../Redux/UrlConfig";
import { getPackageBySlug } from "../../Redux/Actions/packageAction";
import { getProductDetailById } from "../../Redux/Actions/vacationProductAction";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";

const Package = (props) => {
  const params = useParams();
  const {slug} = params
  const location = useLocation();
  const history = useHistory();
  // console.log(params);
  const [packageDestination, setPackageDestination] = useState(
    slug
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [openPackageDate, setOpenPackageDate] = useState(false);

  let { id } = useParams();
  console.log(params)
  console.log("location", location);
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packagesReducer);
  console.log(packages)
  // const { product } = useSelector((state) => state.newVacation);
  // console.log("products>>>", product);
  // const { destination } = useSelector((state) => state.newDestination);

  useEffect(() => {
    dispatch(getPackageBySlug(params.slug));
    // dispatch(getProductDetailById(id));
    // dispatch(getDestinationDetailById(id));
  }, [dispatch, params.slug, id]);

  let readMore = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  };

  let tours = [
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/07/32/c3/6e.jpg",
      plan: "Night Tours",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/0d/3d/07/0d.jpg",
      plan: "Half Day Tours",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/0b/bb/ca/e5.jpg",
      plan: "City Tours",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/07/71/39/f1.jpg",
      plan: "Full Day Tours",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/06/6f/03/c6.jpg",
      plan: "Helicopter Tours",
    },
    {
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-100x100/0c/76/ff/fc.jpg",
      plan: "Adventure Tours",
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

  let cards = [
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/0a/29/a4/a7.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/73/26/88.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/72/f5/3d.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/0a/9a/4c/e1.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/0a/f0/89/9b.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/30/7e/2d.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/0b/b6/25/0f.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
    {
      pakage: "Half-Day Emerald Cove Kayak Tour",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-360x240/06/6b/8c/9f.jpg",
      price: 69.99,
      review: 2355,
      description:
        "Experience the serenity of Emerald Cave, a picturesque natural attraction on the Colorado River. This kayaking tour takes a small group max of 15 people paddling up the river with a guide.",
      time: "4 to 5 hours",
      cancel: "Free Cancellation",
    },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleSearch = () => {
   
  // };
  console.log("pack",packages)
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
          className="carousel slide mt-4"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row g-0">
                {tours.map((tour) => {
                  return (
                    <div className="col-2">
                      <Link to="/">
                        <div className="border border-primary rounded-pill p-2">
                          <img
                            src={tour.image}
                            className="rounded-circle w-25"
                            alt="..."
                          />
                          <span className="text-dark ms-3">{tour.plan}</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="carousel-item">
              <div className="row g-0">
                {tours.map((tour) => {
                  return (
                    <div className="col-2">
                      <Link to="/">
                        <div className="border border-primary rounded-pill p-2">
                          <img
                            src={tour.image}
                            className="rounded-circle w-25"
                            alt="..."
                          />
                          <span className="text-dark ms-3">{tour.plan}</span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark"
              aria-hidden="true"
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
              {packages &&
                packages.map((data, index) => {
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
                           {data.reviews.length > 0  && <p className='text-data'>{data.ratings}/10 {data.numOfReviews} Reviews</p>}
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
                              onClick={function() {
                                dispatch({
                                  type: "NEW_SEARCH",
                                  payload: { packageDestination, dates, options },
                                });
                                history.push(`${params.slug}/${data._id}/detail`,{
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
                })}

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
