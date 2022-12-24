import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import "./StylePackage.css";
import {
  getPackageBySlug,
  getPackageDetailById,
} from "../../Redux/Actions/packageAction";
import { useLocation, useParams } from "react-router-dom";
import { ImageUrl } from "../../Redux/UrlConfig";
import { useState } from "react";

function PackageDetail() {
  const location = useLocation()
  const [showResults, setShowResults] = useState(false);
  const [dates,setDates] = useState(location.state.state.dates);
  const [time, setTime] = useState("");
  console.log("time", time);
  const onClickHandle = () => {
    setShowResults(true);
    console.log("Clicked");
  };
  const Results = () => (
    <div id="results" className="search-results">
      {packages.package.startTime.map((item, index) => {
        return (
          <div>
            <input
              key={index}
              type="radio"
              value={item}
              onChange={(e) => setTime(e.target.value)}
              name={time}
              />
            {item}
              <p>{packages.package.name}</p>
              <p>{packages.package.description}</p>
              <p>Free Cancellation Untill{dates}</p>
          </div>
        );
      })}
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
  //   console.log(params);
  let { id } = useParams();

  const dispatch = useDispatch();
  const packages = useSelector((state) => state.addPackageReducer);
  // console.log("picc>>>>>>>>",packages.package.packageImage)
  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);
  // const {packages} = useSelector((state) => state.packagesReducer);
  // console.log(packages)
  // const {product} = useSelector((state) => state.newVacation);
  // console.log("products>>>", product);

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
          <div class="col-2">
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
            <h4 className="text-black">From ${packages.package.price}</h4>
            <span style={{ color: "#1874A2" }}>Lowest Price Guarantee</span>
            <hr />
            <h4 className="text-black">Select Date and Travelers</h4>
            <input
              className="form-control form-control"
              type="date"
              placeholder=".form-control-lg"
              aria-label=".form-control-lg example"
            ></input>
            {/* <div className="input-group mt-3">
              <span className="input-group-text">
                <i class="fa-regular fa-user"></i>
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder="Adults"
              ></input>
            </div> */}
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
          </div>
        </div>
        <div>{showResults ? <Results /> : null}</div>
        {/* end of package images and price */}
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
          <div className="row">
            <h3 className="text-black fw-bold my-4">Reviews</h3>
            <div className="col-4">
              <h2 className="text-black fw-bold my-1">
                3.5{" "}
                <i
                  style={{ color: "#EDAB56" }}
                  className="fa-solid fa-star fs-5"
                ></i>{" "}
                <i
                  style={{ color: "#EDAB56" }}
                  className="fa-solid fa-star fs-5"
                ></i>{" "}
                <i
                  style={{ color: "#EDAB56" }}
                  className="fa-solid fa-star fs-5"
                ></i>{" "}
                <i
                  style={{ color: "#EDAB56" }}
                  className="fa-solid fa-star fs-5"
                ></i>{" "}
                <i
                  style={{ color: "#EDAB56" }}
                  className="fa-solid fa-star fs-5"
                ></i>{" "}
              </h2>
              <small>22 reviews</small>
            </div>
            <div className="col-8">
              <div className="row my-2">
                <div className="col-2 text-end">
                  <span style={{ color: "#1874A2" }}>5 stars</span>
                </div>
                <div className="col-6 progress">
                  <div
                    className="progress-bar w-75"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="col-4">
                  <span style={{ color: "#1874A2" }}>8</span>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-2 text-end">
                  <span style={{ color: "#1874A2" }}>4 stars</span>
                </div>
                <div className="col-6 progress">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="col-4">
                  <span style={{ color: "#1874A2" }}>6</span>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-2 text-end">
                  <span style={{ color: "#1874A2" }}>3 stars</span>
                </div>
                <div className="col-6 progress">
                  <div
                    className="progress-bar w-25"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="col-4">
                  <span style={{ color: "#1874A2" }}>4</span>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-2 text-end">
                  <span style={{ color: "#1874A2" }}>2 stars</span>
                </div>
                <div className="col-6 progress">
                  <div
                    className="progress-bar w-50"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="col-4">
                  <span style={{ color: "#1874A2" }}>2</span>
                </div>
              </div>
              <div className="row">
                <div className="col-2 text-end">
                  <span style={{ color: "#1874A2" }}>1 stars</span>
                </div>
                <div className="col-6 progress">
                  <div
                    className="progress-bar w-0"
                    role="progressbar"
                    aria-label="Basic example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="col-4">
                  <span style={{ color: "#1874A2" }}>0</span>
                </div>
              </div>
            </div>

            <div className="row my-5">
              {reviews.map((review) => {
                return (
                  <>
                    <h6 className="text-black fw-bold my-1">
                      <i
                        style={{ color: "#EDAB56" }}
                        className="fa-solid fa-star fs-6"
                      ></i>{" "}
                      <i
                        style={{ color: "#EDAB56" }}
                        className="fa-solid fa-star fs-6"
                      ></i>{" "}
                      <i
                        style={{ color: "#EDAB56" }}
                        className="fa-solid fa-star fs-6"
                      ></i>{" "}
                      <i
                        style={{ color: "#EDAB56" }}
                        className="fa-solid fa-star fs-6"
                      ></i>{" "}
                      <i
                        style={{ color: "#EDAB56" }}
                        className="fa-solid fa-star fs-6 me-2"
                      ></i>{" "}
                      {review.title}{" "}
                    </h6>
                    <p className="text-black my-2">
                      {review.name}, {review.date}
                    </p>
                    <p className="text-black">{review.comment}</p>
                  </>
                );
              })}
            </div>
          </div>

          {/* start of package reviews */}
        </div>
      </div>

      {/* end of page */}

      <Footer />
    </>
  );
}

export default PackageDetail;
