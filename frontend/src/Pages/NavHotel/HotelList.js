import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Footer/Footer";
import HotelNav from "../../Navbar/HotelNav/HotelNav";
import Navbar from "../../Navbar/Navbar";
import { getHotels } from "../../Redux/Actions/hotelAction";
import { getAllVacationProduct } from "../../Redux/Actions/vacationProductAction";
import { ImageUrl } from "../../Redux/UrlConfig";

const HotelList = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotelReducer);
  const { products } = useSelector((state) => state.vacationProduct);
  useEffect(() => {
    dispatch(getHotels());
    dispatch(getAllVacationProduct());
  }, [dispatch]);

  return (
    <>
      <div style={{ background: "rgb(0, 0, 0)", height: "75px" }}>
        <Navbar />
      </div>
      <HotelNav />
      <div className="container text-center my-5">
        <div className="row">
          <div className="col-md-3">
            <i className="fa-solid fa-shield-halved text-primary fs-3"></i>
            <p className="text-dark mt-2 fw-bold ">FLEXIBLE BOOKINGS</p>
            <small>
              Plans change. Thats why we offer free cancellation on most hotels
              & rental cars.
            </small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-hand-holding-dollar text-primary fs-3"></i>
            <p className="text-dark mt-2 fw-bold ">BOOK WITH CONFIDENCE</p>
            <small>Priceline members always get our best price.</small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-phone text-primary fs-3"></i>
            <p className="text-dark mt-2 fw-bold ">UNLOCK SPECIAL DISCOUNTS</p>
            <small>
              1 in 4 people save 20% or more over the phone. Call Now.
            </small>
          </div>
          <div className="col-md-3">
            <i className="fa-solid fa-circle-question text-primary fs-3"></i>
            <p className="text-dark mt-2 fw-bold ">HELP 24/7</p>
            <small>
              We are always here for you reach us 24 hours a day, 7 days a week.
            </small>
          </div>
        </div>
        {/* end of info of contact about hotel */}

        {/* start of email sign up */}
        <div className="row my-5 g-2">
          <div style={{ height: "250px" }} className="col-md-6">
            <div className="card h-100">
              <img
                src="https://images.unsplash.com/photo-1671540675978-472b34f36c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                className="card-img h-100"
                alt="..."
              />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">
                  Sign up for Email-only Coupons
                </h2>
                <p className="card-text text-white text-start fs-5">
                  Exclusive access to coupons, special offers and promotions.
                </p>
                <button type="button" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div style={{ height: "250px" }} className="col-md-6">
            <div className="card h-100">
              <img
                src="https://images.unsplash.com/photo-1671540675978-472b34f36c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                className="card-img h-100"
                alt="..."
              />
              <div className="card-img-overlay">
                <h2 className="card-title text-white text-start fw-bold">
                  Sign up for Email-only Coupons
                </h2>
                <p className="card-text text-white text-start fs-5">
                  Exclusive access to coupons, special offers and promotions.
                </p>
                <button type="button" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end of email sign up */}

        {/* start of hotels card */}
        <div className="row">
          <h1 className="text-start text-primary fw-bold">
            Don't miss these hotel deals
          </h1>
          <div className="container text-center">
            <div className="row">
              {hotels &&
                hotels.map((hotel) => {
                  return (
                    <div className="col-md-4 my-3">
                      <div className="card">
                        <img
                          src={ImageUrl(hotel.hotelImages[0].img)}
                          style={{ height: "250px" }}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <p className="card-text text-start">{hotel.city}</p>
                          <div className="row">
                            <h5 className="card-title text-start fw-bold text-dark col-md-8">
                              {hotel.name}
                            </h5>
                            <h6 className="card-title text-end text-primary fw-bold col-md-4">
                              From PKR {hotel.cheapestPrice}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {/* end of hotels card */}

        {/* start of hotels list */}
        <div className="row my-5">
          <h4 className="text-start text-primary fw-bold">
            Top Hotel Deals in the Pakistan
          </h4>
          <div class="container">
            <div className="row">
              <div className="col-md-3">
                <ul className="list-unstyled text-start text-dark lh-lg">
                  {products &&
                    products.slice(0, 10).map((item, index) => {
                      return (
                        <li key={index}>
                          {/* <Link to={`/hotelsby/${item.slug}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="list-unstyled text-start text-dark lh-lg">
                  {products &&
                    products.slice(10, 20).map((item, index) => {
                      return (
                        <li key={index}>
                          {/* <Link to={`/hotelsby/${item.slug}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="list-unstyled text-start text-dark lh-lg">
                  {products &&
                    products.slice(20, 30).map((item, index) => {
                      return (
                        <li key={index}>
                          {/* <Link to={`/hotelsby/${item.slug}`}> */}
                          {item.name}
                          {/* </Link> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="list-unstyled text-start text-dark lh-lg">
                  {products &&
                    products.slice(30, 40).map((item, index) => {
                      return (
                        <li key={index}>
                          {/* <Link to={item.slug}> */}
                          {item.name}
                          {/* </Link> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* end of hotels list */}
      </div>
      <Footer />
    </>
  );
};

export default HotelList;
