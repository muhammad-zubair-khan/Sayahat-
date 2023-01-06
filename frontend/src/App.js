import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./Components/Private/PrivateRoute";
import Home from "./Pages/Home/Home";
import Hotel from "./Pages/Hotel/Hotel";
import HotelDetail from "./Pages/HotelDetails/HotelDetail";
import HotelBySlug from "./Pages/HotelBySlug/HotelBySlug";
import Car from "./Pages/Cars/Car";
import CarRental from "./Pages/CarRental/CarRental";
import CarDetail from "./Pages/CarDetails/CarDetail";
import Aboutus from "./Pages/About/Aboutus";
import Contactus from "./Pages/Contact/Contactus";
import Login from "./Pages/Account/Login";
import SignUp from "./Pages/Account/SignUp";
import Forgot from "./Pages/Account/Forgot";
import Cities from "./Pages/Citites/Cities";
import City from "./Pages/Cities/LahoreCity";
import TopDestination from "./Pages/Destination/TopDestination";
import TopDestinationDetail from "./Pages/Destination/TopDestinationDetail";
import PackageDetail from "./Pages/PackageDetails/PackageDetail";
import SearchedPackage from "./Pages/SearchedPackage/SearchedPackage";
import SearchedPackageDetail from "./Pages/SearchedPackage/SearchedPackageDetail";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../src/Redux/Actions/authActions";
// import { getAllVacationsCategory } from "./Redux/Actions/vacationCategoryAction";
// import { getInitialData } from "../src/Redux/Actions/initialDataAction";
import HotelList from "./Pages/NavHotel/HotelList";
import Checkout from "./Pages/Checkout/Checkout";
import HotelCheckout from "./Pages/Checkout/HotelCheckout";
import PackageCheckout from "./Pages/Checkout/PackageCheckout";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ContactDetails from "./Pages/Checkout/ContactDetails/ContactDetails";
import ActivityDetails from "./Pages/Checkout/ActivityDetails/ActivityDetails";
import Payment from "./Pages/Payment/Payment";
import HotelContactDetails from "./Pages/Checkout/Hotel/HotelContactDetails";
import HotelActivityDetails from "./Pages/Checkout/Hotel/HotelActivityDetails";
import HotelPayment from "./Pages/Checkout/Hotel/HotelPayment";
import PackageReserveSuccess from "./Components/Success/PackageReserveSuccess";
import HotelBookingSuccess from "./Components/Success/HotelBookingSuccess";
import MyProfile from "./Pages/Profile/MyProfile";
import MyPackages from "./Pages/Bookings/Packages/MyPackages";
import MyHotels from "./Pages/Bookings/Hotels/MyHotels";
import MyPackageDetails from "./Pages/Bookings/Packages/MyPackageDetails";
import MyHotelDetails from "./Pages/Bookings/Hotels/MyHotelDetails";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [stripeApiKey, setStripeApiKey] = useState("");
  console.log(stripeApiKey);
  async function getStripeApiKey() {
    const { data } = await axios.get(
      `http://www.localhost:5000/api/stripeapikey`
    );
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    getStripeApiKey();
    // if (user.authenticate) {
    //   dispatch(getInitialData());
    //   dispatch(getAllVacationsCategory());
    // }
  }, [dispatch, auth.authenticate]);

  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);

  return (
    <Router>
       
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vacation/:slug/:slug/:id" component={City} />
        <Route exact path="/vacation/:slug" component={Cities} />

        {/* Hotels */}
        <Route exact path="/hotels" component={Hotel} />
        <Route exact path="/hotel/:id" component={HotelDetail} />
        <Route exact path="/hotelsby/:slug" component={HotelBySlug} />

        {/* Cars */}
        <Route exact path="/cars" component={Car} />
        <Route exact path="/car/:id" component={CarDetail} />
        <Route exact path="/car-rentals" component={CarRental} />

        {/* Packages */}
        <Route exact path="/packages" component={SearchedPackage} />
        <Route exact path="/package/:id" component={SearchedPackageDetail} />
        <Route
          exact
          path="/vacation/:slug/:slug/:id/detail"
          component={PackageDetail}
        />
        <Route exact path="/aboutus" component={Aboutus} />
        <Route exact path="/contactus" component={Contactus} />

        {/* <Route exact path="/car/:id/checkout" component={Checkout} /> */}
        {/* <Route exact path="/hotel/:id/checkout" component={HotelCheckout} /> */}

        {/* Hotel Booking */}
        <Route
          exact
          path="/hotel/:id/contactDetail"
          component={HotelContactDetails}
        />
        <Route
          exact
          path="/hotel/:id/hotelactivityDetail"
          component={HotelActivityDetails}
        />
         <Route
          exact
          path="/hotel/booking/success"
          component={HotelBookingSuccess}
        />
        <Route exact path="/myHotels" component={MyHotels} />
        <Route exact path="/myHotel/:id" component={MyHotelDetails} />



        {/* <Route exact path="/package/:id/checkout" component={PackageCheckout} /> */}
        {/* Package Booking */}
        <Route
          exact
          path="/package/:id/contactdetails"
          component={ContactDetails}
        />
        <Route
          exact
          path="/package/:id/activitydetails"
          component={ActivityDetails}
        />
        <Route
          exact
          path="/package/reserve/success"
          component={PackageReserveSuccess}
        />
        <Route exact path="/myProfile" component={MyProfile} />
        <Route exact path="/myPackages" component={MyPackages} />
        <Route exact path="/myPackage/:id" component={MyPackageDetails} />
        <Route exact path="/hotels/all" component={HotelList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/forgot-password" component={Forgot} />
        {stripeApiKey && (
        <>
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route
              exact
              path="/package/:id/process/payment"
              component={Payment}
            />
          </Elements>
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Route
              exact
              path="/hotelBooking/:id/process/payment"
              component={HotelPayment}
            />
          </Elements>
        </>
        )}
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
