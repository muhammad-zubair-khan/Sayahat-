import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MetaData from "../../Components/MetaData/MetaData";
import Navbar from "../../Navbar/Navbar";
import { myCars } from "../../Redux/Actions/bookCarAction";
import { myHotels } from "../../Redux/Actions/bookHotelAction";
import { myPackages } from "../../Redux/Actions/bookPackageAction";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const TripDetail = () => {
  const dispatch = useDispatch();
  var { loading, error, packages } = useSelector((state) => state.myPackages);
  var { loading, error, cars } = useSelector((state) => state.myCars);
  var { loading, error, hotels } = useSelector((state) => state.myHotels);
  const [trip, setTrip] = useState({});
  const params = useParams();
  const { id } = params;
  const getTrip = async () => {
    const response = await axios(`http://localhost:5000/api/trip/${id}`, {
      method: "GET",
    });
    setTrip(response.data.trip);
  };

  useEffect(() => {
    getTrip();
    dispatch(myPackages());
    dispatch(myCars());
    dispatch(myHotels());
  }, []);

  //   if(Object.keys(trip).length === 0 ){
  //     return null
  //   }
  return (
    <>
      <MetaData title={`Trips  overview | Sayahat`} />
      <div style={{ background: " rgb(0 0 0)", height: "75px" }}>
        <Navbar />
      </div>
      <Container style={{ width: "max-content", marginTop: "39px" }}>
        <div>
            <Link to='/trips'>
                <span><KeyboardBackspaceIcon style={{marginBottom:'2px'}}/></span> Potential trips</Link>
          <div>{trip.name}</div>
          <div className="your-bookings">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Your bookings</h3>{" "}
              <small style={{ display: "flex", alignItems: "center" }}>
                {hotels && cars && packages ? (
                  <>
                    Total Bookings{" "}
                    {cars.length + hotels.length + packages.length}
                  </>
                ) : (
                  ""
                )}
              </small>
            </div>
            {packages || cars ? (
              <>
                {packages &&
                  packages.map((data) => {
                    return (
                      <>
                        <div key={data.name}>
                          <small>Package Booking: </small>
                          {data.name}
                        </div>
                      </>
                    );
                  })}
                {cars &&
                  cars.map((data) => {
                    return (
                      <>
                        <div key={data.name}>
                          <small>Car Booking: </small>
                          {data.name}
                        </div>
                      </>
                    );
                  })}
                {hotels &&
                  hotels.map((data) => {
                    return (
                      <>
                        <div key={data.name}>
                          <small>Hotel Booking: </small>
                          {data.name}
                        </div>
                      </>
                    );
                  })}
              </>
            ) : (
              <p>
                You don't have any bookings yet. But you will find everything
                you book here as you plan your trip.
              </p>
            )}
          </div>
          <div className="your-bookings">
            <h3>Your saved items</h3>
            <p>
              Time to explore! Save places to stay and things to do so you can
              plan your trip with ease.
            </p>
            <Link
              style={{ border: "1px solid #d7d7d7", padding: "4px 87px" }}
              to="/"
            >
              Start Searching
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TripDetail;
