import React from "react";
import Landing from "../../Landing/Landing";
import Navbar from "../../Navbar/Navbar";
import {Helmet} from 'react-helmet'

const Home = () => {
  return (
    <>
      <Helmet>
       <title>Sayahat</title>
<meta name="SAYAHAT" content="SAYAHAT"/>
<meta name="description" content="Explore Paksitan with Sayahat.com. Big savings on homes, hotels, car rentals and attractions – build your perfect trip on any budget."/>
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <Landing />
    </>
  );
};

export default Home;
