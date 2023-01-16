import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import "../CarBookingDetails.css";

const HotelBookingDetail = (props) => {
  let [responseData, setResponseData] = useState("");
  const url = `http://localhost:5000/api/admin/bookedHotel/detail`;

  // const {id} = useParams()
  const getBookedHotelDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.hoteldetails);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    getBookedHotelDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //  if(Object.keys(responseData).length === 0){
  //       return null
  //   }
  return (
    <>
      {/* <MetaData title="Order Details" /> */}
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Hotel Booking Details</Typography>
          <Typography component="h1">hotel # {responseData._id}</Typography>
          <Typography>Contact Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>
                {responseData && responseData.hotelContactInfo.firstName}
              </span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{responseData && responseData.hotelContactInfo.phone}</span>
            </div>
            <div>
              <p>Email:</p>
              <span>{responseData && responseData.hotelContactInfo.email}</span>
            </div>
          </div>

          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  responseData &&
                  responseData.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {responseData && responseData.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>

            <div>
              <p>Amount:</p>
              <span>{responseData.price}</span>
            </div>
          </div>

          <Typography>Hotel Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData.name}</span>
            </div>
            <div>
              <p>check-in Date:</p>
              <span>
                {responseData &&
                  responseData.hotelActivityInfo.dates[0].startDate}
              </span>
            </div>
            <div>
              <p>check-out Date:</p>
              <span>
                {responseData &&
                  responseData.hotelActivityInfo.dates[0].endDate}
              </span>
            </div>
            <div>
              <p>Adult:</p>
              <span>
                {responseData &&
                  responseData.hotelActivityInfo.options[0].adult}
              </span>
            </div>
            <div>
              <p>Children:</p>
              <span>
                {responseData &&
                  responseData.hotelActivityInfo.options[0].children}
              </span>
            </div>
            <div>
              <p>Room:</p>
              <span>
                {responseData && responseData.hotelActivityInfo.options[0].room}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelBookingDetail;
