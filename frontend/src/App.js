import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/Private/PrivateRoute";
import Navbar from "./Navbar/Navbar";
import Landing from "./Landing/Landing";
import Home from "./Pages/Home/Home";
import Hotel from "./Pages/Hotel/Hotel";
import HotelDetail from "./Pages/HotelDetails/HotelDetail";
import Car from "./Pages/Cars/Car";
import CarRental from "./Pages/CarRental/CarRental";
import CarDetail from "./Pages/CarDetails/CarDetail";
import Aboutus from "./Pages/About/Aboutus";
import Contactus from "./Pages/Contact/Contactus";
import LahoreCity from "./Pages/Cities/LahoreCity";
import Tours from "./Pages/Tours/Tours";
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
import { getAllVacationsCategory } from "./Redux/Actions/vacationCategoryAction";
import { isUserLoggedIn } from "../src/Redux/Actions/userActions";
import { getInitialData } from "../src/Redux/Actions/initialDataAction";
import HotelList from "./Pages/NavHotel/HotelList";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  console.log(user)

  useEffect(() => {
    if (!user.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // if (user.authenticate) {
    //   dispatch(getInitialData());
    //   dispatch(getAllVacationsCategory());
    // }
  }, [dispatch, user.authenticate]);

  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route exact path="/vacation/:slug/:slug/:id" component={City} />
        <Route exact path="/vacation/:slug"  component={Cities} />
        <Route exact path="/top-destination/:slug/:id"  component={TopDestination} />
        <Route exact path="/top-destination/:slug/:id/detail"  component={TopDestinationDetail} />
        {/* <Route exact path="/lahore" component={LahoreCity} /> */}
        <Route exact path="/hotels" component={Hotel} />
        <Route exact path="/hotel/:id" component={HotelDetail} />
        <Route exact path="/cars" component={Car} />
        <Route exact path="/car/:id" component={CarDetail} />
        <Route exact path="/aboutus" component={Aboutus} />
        <Route exact path="/car-rentals" component={CarRental} />
        <Route exact path="/package/:slug" component={SearchedPackage} />
        <Route exact path="/package/:slug/:id/detail" component={SearchedPackageDetail} />
        <Route exact path="/vacation/:slug/:slug/:id/detail"  component={PackageDetail}/>
        <Route exact path="/contactus" component={Contactus} />
        <Route exact path="/car/:id/checkout" component={Checkout} />
        <Route exact path="/hotels-list" component={HotelList} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route path="/forgot-password" component={Forgot} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
