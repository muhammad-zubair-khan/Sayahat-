import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Landing from "./Landing/Landing";


function App() {

  return (
    
        <BrowserRouter>
          <Navbar/>
          <Landing/>
          {/* <Routes>
            
          </Routes> */}
          {/* <Footer /> */}
        </BrowserRouter>
     
  );
}

export default App;
