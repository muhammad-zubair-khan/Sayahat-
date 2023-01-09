import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getBookedCarDetail } from '../../Redux/Actions/bookCarAction'
import { Typography } from "@mui/material";
import axios from "axios";

const BookingDetailsScreen = (props) => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  // const {bookedCar} = useSelector((state)=> state.bookedCarDetail)
  // console.log(bookedCar)
  let [responseData, setResponseData] = useState("");
  const url = `http://localhost:5000/admin/bookedCar/detail`;

  const getBookedCarDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      console.log(res)
      setResponseData(res.data.cardetails);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  useEffect(() => {
    dispatch(getBookedCarDetail());
  }, []);

  return (
    <>
      {/* <MetaData title="Order Details" /> */}
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">car # {responseData._id}</Typography>
          <Typography>Contact Info</Typography>
          {/* <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData.CarContactInfo.firstName}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{responseData.CarContactInfo.phone}</span>
            </div>
            <div>
              <p>Email:</p>
              <span>{responseData.CarContactInfo.email}</span>
            </div>
          </div> */}
          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            {/* <div>
              <p
                className={
                  responseData.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {responseData.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div> */}

            <div>
              <p>Amount:</p>
              <span>{responseData.price}</span>
            </div>
          </div>

          <Typography>Car Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData.name}</span>
            </div>
            <div>
              <p>From:</p>
              <span>{responseData.From}</span>
            </div>
            <div>
              <p>To:</p>
              <span>{responseData.To}</span>
            </div>
            <div>
              <p>Pickup Time:</p>
              <span>{responseData.PickupTime}</span>
            </div>
            <div>
              <p>Dropoff Time:</p>
              <span>{responseData.DropoffTime}</span>
            </div>
            <div>
              <p>Pickup Date:</p>
              <span>{responseData.StartingDate}</span>
            </div>
            <div>
              <p>Dropoff Date:</p>
              <span>{responseData.EndingDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsScreen;
