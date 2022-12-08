import React, { useEffect,useState } from "react";
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
import { isUserLoggedIn } from "./Redux/Actions/userActions";
import VacationScreen from "./screens/Vacation/VacationScreen";
import AddNewCitites from "./screens/Vacation/AddNewCitites";
import CitiesScreen from "./screens/Vacation/CitiesScreen";
import { getAllVacationsCategory } from "./Redux/Actions/vacationCategoryAction";
import { getInitialData } from "./Redux/Actions/initialDataAction";
import AllCities from "./screens/Vacation/AllCities";

function App() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
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
        <PrivateRoute exact path="/create-vacations" component={AddNewCitites} />
        <PrivateRoute exact path="/all-cities" component={AllCities} />
        <PrivateRoute exact path="/users" component={UserScreen} />
        <PrivateRoute exact path="/profile" component={ProfileScreen} />
        <Route exact path="/login" component={Signin} />

        <Route path="*" component={<> not found</>} />
      </Switch>
    </Router>
  );
}

export default App;
