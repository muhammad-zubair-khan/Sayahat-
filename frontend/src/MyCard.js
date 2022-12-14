import React from "react";
import "./MyCard.css";
import { useState } from "react";

const MyCard = () => {
  const cardData = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  const cardDataTwo = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  const cardDataThree = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  let [count, setcount] = useState(1);

  let [progress, setprogress] = useState(27);

  // const [isDisabled, setDisabled] = useState(false);

  let countIncrement = () => {
    if (count < 4) {
      setcount(count + 1);
      setprogress(progress + 27);
    } else {
      // document.getElementById("nextBtn").style.display = 'none';
      // setDisabled(true);
      // buttonRef.current.disabled = true;
      console.log("disabled")
    }
  };

  const countDecrement = () => {
    if (count > 1) {
      setcount(count - 1);
      setprogress(progress - 27);
      document.getElementById("nextBtn").style.display = 'block';

    }
  };
  return (
    <>
      <div className="container-fluid position-relative">
        <div className="row g-0">
          <div className="col-4 bgCarousel">
            <button
              className="btnPrev p-2"
              onClick={() => countDecrement()}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="btnNext p-2"
              id="nextBtn"
              onClick={() => countIncrement()}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
              // disabled={count >= 3}
              // disabled={isDisabled}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>

            <h1 className="countOfCard">0{count}</h1>
            <div className="progress stepBar">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                aria-label="Warning example"
                style={{ width: `${progress}%` }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col-8">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              // data-bs-ride="true"
              data-bs-touch="false"
              data-interval="false"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container text-center">
                    <div className="row">
                      { cardData.map((data) => {
                        return (
                          <div className="col-md-4">
                            <div className="card">
                              <img
                                src={data.image}
                                class="card-img-top"
                                alt="..."
                              />
                              <div className="card-body">
                                <h5 className="card-title">{data.country}</h5>
                                <p className="card-text">{data.description}</p>
                                <span>
                                  <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                                  <span>{data.rating}</span>
                                </span>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <span>Price</span>
                                    <h4 style={{ color: "#F3941E" }}>
                                      ${data.dicPrice}
                                    </h4>
                                  </div>
                                  <div className="col-6">
                                    <p class="text-decoration-line-through pt-4">
                                      {data.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="container text-center">
                    <div className="row">
                      {cardDataTwo.map((data) => {
                        return (
                          <div className="col-md-4">
                            <div className="card">
                              <img
                                src={data.image}
                                class="card-img-top"
                                alt="..."
                              />
                              <div className="card-body">
                                <h5 className="card-title">{data.country}</h5>
                                <p className="card-text">{data.description}</p>
                                <span>
                                  <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                                  <span>{data.rating}</span>
                                </span>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <span>Price</span>
                                    <h4 style={{ color: "#F3941E" }}>
                                      ${data.dicPrice}
                                    </h4>
                                  </div>
                                  <div className="col-6">
                                    <p class="text-decoration-line-through pt-4">
                                      {data.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="carousel-item">
                  <div className="container text-center">
                    <div className="row">
                      {cardDataThree.map((data) => {
                        return (
                          <div className="col-md-4">
                            <div className="card">
                              <img
                                src={data.image}
                                class="card-img-top"
                                alt="..."
                              />
                              <div className="card-body">
                                <h5 className="card-title">{data.country}</h5>
                                <p className="card-text">{data.description}</p>
                                <span>
                                  <i className="fa-solid fa-calendar-days text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-regular fa-clock text-primary ps-3 pe-2"></i>
                                  <span>{data.date}</span>
                                  <i className="fa-solid fa-star text-primary ps-3 pe-2"></i>
                                  <span>{data.rating}</span>
                                </span>
                                <div className="row mt-3">
                                  <div className="col-6">
                                    <span>Price</span>
                                    <h4 style={{ color: "#F3941E" }}>
                                      ${data.dicPrice}
                                    </h4>
                                  </div>
                                  <div className="col-6">
                                    <p class="text-decoration-line-through pt-4">
                                      {data.price}
                                    </p>
                                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCard;
