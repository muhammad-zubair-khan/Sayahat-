import React, { useState, useEffect } from 'react';
import { Route,Switch} from "react-router-dom";
import { Routes } from "../routes";
import Sidebar from '../components/Sidebar'
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
// import Presentation from './Presentation';
import DashboardOverview from './dashboard/DashboardOverview';
import Category from './Category/Category'
// import PrivateRoute from '../components/Private/PrivateRoute';
import SignIn from '../pages/SignIn/SignIn';
import Products from './Products/AllProducts';
// import GetCategories from './Category/GetCategories/GetCategories';



// const RouteWithLoader = ({ component: Component, ...rest }) => {
//     const [loaded, setLoaded] = useState(false);
  
//     useEffect(() => {
//       const timer = setTimeout(() => setLoaded(true), 1000);
//       return () => clearTimeout(timer);
//     }, []);
  
//     return (
//       <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
//     );
//   };
  
  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 1000);
      return () => clearTimeout(timer);
    }, []);
  

  
 
  
    return (
      <Route {...rest} render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />
  
          <main className="content">
            <Navbar />
              <Component {...props} />
            {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
          </main>
        </>
      )}
      />
    );
  };

  const Home =  () => (
    <Switch>
         <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
         <RouteWithSidebar exact path={Routes.Category.path} component={Category} />
         <RouteWithSidebar exact path={Routes.Products.path} component={Products} />

      <Route path={Routes.SignIn.path} component={SignIn}/>
    </Switch>
  );
  export default Home;
  