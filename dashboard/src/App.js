import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import Signin from "./components/Signin";
import PrivateRoute from "./components/Private/PrivateRoute";
import HomeScreen from "./screens/Home/HomeScreen";
import UserScreen from "./screens/User/UserScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import { isAdminLoggedIn } from "./Redux/Actions/adminActions";
import VacationScreen from "./screens/Vacation/VacationScreen/VacationScreen";
import AddNewCitites from "./screens/Vacation/CitiesScreen/AddNewCitites";
import CreateTopDestinations from "./screens/Destination/CreateTopDestinations";
import CitiesScreen from "./screens/Vacation/CitiesScreen/CitiesScreen";
import CitiesManagementScreen from "./screens/Vacation/CitiesScreen/CitiesManagementScreen";
import { getAllVacationsCategory } from "./Redux/Actions/vacationCategoryAction";
import { getInitialData } from "./Redux/Actions/initialDataAction";
import AllCities from "./screens/Vacation/CitiesScreen/AllCities";
import AllDestinations from "./screens/Destination/AllDestinations";
import AllHotels from "./screens/Vacation/HotelScreens/AllHotels";
import AllCars from "./screens/Vacation/CarScreen/AllCars";
import GetHotelBySlug from "./screens/Vacation/HotelScreens/GetHotelBySlug";
import GetCarBySlug from "./screens/Vacation/CarScreen/GetCarBySlug";
import AllPackages from "./screens/Vacation/PackageScreen/AllPackages";
import AllRooms from "./screens/Vacation/RoomScreen/AllRooms";
import GetPackageBySlug from "./screens/Vacation/PackageScreen/GetPackageBySlug";
import AddRoom from "./screens/Vacation/RoomScreen/AddRoom";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isAdminLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
      dispatch(getAllVacationsCategory());
    }
  }, [dispatch, auth.authenticate]);
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute exact path="/vacations/add" component={VacationScreen} />
        <PrivateRoute exact path="/vacations/:slug" component={CitiesScreen} />
        <PrivateRoute
          exact
          path="/vacations/:slug/add"
          component={CitiesManagementScreen}
        />
        <PrivateRoute
          exact
          path="/create-vacations"
          component={AddNewCitites}
        />
        {/* <PrivateRoute
          exact
          path="/create-top-destinations"
          component={CreateTopDestinations}
        /> */}
        <PrivateRoute exact path="/all-cities" component={AllCities} />
        {/* <PrivateRoute
          exact
          path="/all-top-destinations"
          component={AllDestinations}
        /> */}
        <PrivateRoute exact path="/hotel/:slug" component={GetHotelBySlug} />
        <PrivateRoute exact path="/car/:slug" component={GetCarBySlug} />
        <PrivateRoute
          exact
          path="/package/:slug"
          component={GetPackageBySlug}
        />
        <PrivateRoute
          exact
          path="/room/create/:hotelId"
          component={AddRoom}
        />
        <PrivateRoute
          exact
          path="/hotel/:slug/room/create/:hotelId"
          component={AddRoom}
        />
        <PrivateRoute exact path="/all-hotels" component={AllHotels} />
        <PrivateRoute exact path="/all-cars" component={AllCars} />
        <PrivateRoute exact path="/all-packages" component={AllPackages} />
        <PrivateRoute exact path="/all-rooms" component={AllRooms} />
        <PrivateRoute exact path="/users" component={UserScreen} />
        <PrivateRoute exact path="/profile" component={ProfileScreen} />
        <Route exact path="/login" component={Signin} />

        <Route path="*" component={<> not found</>} />
      </Switch>
    </Router>
  );
}

export default App;
