import React,{ useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./responsive.css";
import Signin from "./components/Signin";
import PrivateRoute from "./components/Private/PrivateRoute";
import HomeScreen from "./screens/Home/HomeScreen";
import UserScreen from "./screens/User/UserScreen";
import { isUserLoggedIn } from "./Redux/Actions/userActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  
  }, [dispatch, auth.authenticate]);
  return (
    <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomeScreen}/>
          <PrivateRoute exact path="/users" component={UserScreen} />
          <Route exact path="/login" component={Signin} />

          <Route path="*" component={<> not found</>} />
        </Switch>
    </Router>
  );
}

export default App;
