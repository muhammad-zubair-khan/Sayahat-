import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import "./StyleCity.css";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Offcanvas from "react-bootstrap/Offcanvas";
import Footer from "../../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPackageBySlug } from "../../Redux/Actions/packageAction";
import { getVacationProductsBySlug } from "../../Redux/Actions/vacationProductAction";

const LahoreCity = (props) => {
  const params = useParams();
  let { slug } = useParams();

  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.packagesReducer);
  // console.log(packages)
  const { products } = useSelector((state) => state.vacationProduct);
  console.log("products>>>", products);

  useEffect(() => {
    dispatch(getPackageBySlug(params.slug));
    dispatch(getVacationProductsBySlug);
  }, [dispatch,params.slug]);

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
  return (
    <>
      <Navbar />
      <div className="bgCity"></div>
      <div className="container-fluid position-absolute top-100 introText">
        {/* Start of introduction of city */}
        <div className="row ms-4 mt-5">
          <div className="col-10 ms-5">
            <h1 className="lhrH1">{params.slug}</h1>
            {products &&
              products.map((data, index) => {
                return (
                  <div key={index}>
                  <p className="lhrIntro mt-5">
                    {data.description}
                  </p>
                  </div>
                );
              })}

            <h4 className="text-dark">History</h4>
            {/* <p className="text-dark">
              Legend has it that it was founded about 4,000 years ago by Loh,
              son of Rama, the hero of the Hindu epic, the Ramayana. Reminiscent
              of its hoary past are the remains of a subterranean temple
              attributed to Rama, in the northern part of the Royal Fort. Lahore
              is at least 2,000 years old. After Islam came to South Asia, it
              became a centre of learning, and attracted some of the region's
              greatest mystics, writers and artists.<span id="dots"></span>
              <span id="more">
                {" "}
                The people of Lahore, when they want to emphasize the uniqueness
                of their town say "Lahore, Lahore aye" (Lahore is Lahore).
                Lahore is the city of poets, artists and (until 2007) the centre
                of the Pakistani film industry. It has the largest number of
                educational institutions in the country and some of the finest
                gardens in the continent. Apart from being the cultural and
                academic centre of the country, Lahore has the finest Mughal
                architecture in Pakistan. For more than 200 years (beginning
                from about 1524), Lahore was a thriving cultural centre of the
                Mughal Empire, and Mughal emperors beautified Lahore, with
                palaces, gardens and mosques.
                <br />
                <br />
                Hiuen Tsang, the famous 7th century Chinese pilgrim, gave a
                vivid description of Lahore. Lying on the main trade and
                invasion routes to South Asia, Lahore has been ruled and
                plundered by a number of dynasties. Muslim rule began here when
                Qutub-ud-din Aibak was crowned in Lahore in 1206 and became the
                first Muslim Sultan of the Subcontinent. Lahore waxed and waned
                in importance during the Sultanate. However, it touched the
                zenith of its glory during the Mughal rule from 1524 to 1752.
                The Mughals, who were famous as builders, gave Lahore some of
                its finest architectural monuments, many of which today are no
                longer. Lahore was Akbar's capital from 1584 to 1598. He built
                the massive Lahore Fort on the foundations of a previous fort,
                and enclosed the city within a red brick wall boasting 12 gates.
                Jahangir and Shah Jahan (who was born in Lahore) extended the
                fort, built palaces and tombs, and laid out gardens. Jahangir
                loved the city, and he and his wife Noor Jahan are buried at
                Shahdara on the outskirts of Lahore. Aurangzeb (1658-1707) gave
                Lahore its most famous monuments: the Badshahi Masjid (Royal
                Mosque) and the Alamgiri gateway to the fort.
              </span>
            </p> */}
            <div className="d-flex justify-content-center">
              <button className="btnRead" onClick={() => readMore()} id="myBtn">
                Read more
              </button>
            </div>
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
                    <div style={{ backgroundColor: "#186B6D" }} className="p-4">
                      <p style={{ color: "white" }}>When are you traveling?</p>
                      <input
                        className="form-control form-control-lg"
                        type="date"
                        placeholder=".form-control-lg"
                        aria-label=".form-control-lg example"
                      ></input>
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
                            src={data.packageImage}
                            class="img-fluid rounded-start h-100"
                            alt="image"
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
                                  {data.price} $
                                </h5>
                              </div>
                            </div>
                            <p class="card-text">
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star"
                              ></i>
                              <i
                                style={{ color: "#EDAB56" }}
                                className="fa-solid fa-star"
                              ></i>
                              {/* <span className="ms-2">{card.review}</span> */}
                              <div className="mt-1">
                                <small>{data.description}</small>
                              </div>
                            </p>
                            <small class="text-dark">
                              <div>
                                <i class="fa-regular fa-clock me-2"></i>
                                {data.duration}
                              </div>
                              <i class="fa-solid fa-check me-2"></i>
                              {data.refundable}
                            </small>
                            <Button
                              variant="contained"
                              style={{ float: "right" }}
                            >
                              Reserve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <nav aria-label="Page navigation example">
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
              </nav>
            </div>
            {/* End of package cards */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LahoreCity;
