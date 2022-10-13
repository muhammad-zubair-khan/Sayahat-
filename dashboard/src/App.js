import React, { useEffect } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import "./scss/volt.scss";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData, getCategory } from "./actions";
import PrivateRoute from "./components/Private/PrivateRoute";
import Sidebar from "./components/Sidebar";
import SignIn from "./pages/SignIn/SignIn"
import DashboardOverview from "./pages/dashboard/DashboardOverview"
import Navbar from "./components/Navbar";


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  
  }, [dispatch, auth.authenticate]);

  return (
    // <Home/>
    <div className="App">
      {auth.authenticate && (
        <>
          <Sidebar />
        </>
      )}
      <Switch>
        {/* <main className="content"> */}
          <PrivateRoute path="/" exact component={DashboardOverview} />
          

          <Route path="/signin" component={SignIn} />
          {/* <Route path="**" component={PageNotFound}/> */}
        {/* </main> */}
      </Switch>
    </div>
  );
}

export default App;
