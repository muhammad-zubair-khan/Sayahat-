import React, { useEffect, useState } from "react";
// import { getBookedCarDetail } from '../../Redux/Actions/bookCarAction'
import { Typography } from "@mui/material";
import axios from "axios";
import '../CarBookingDetails.css'

const BookingDetailsScreen = (props) => {
  let [responseData, setResponseData] = useState("");
  console.log(responseData)
  const url = `http://localhost:5000/api/admin/bookedCar/detail`;

  // const {id} = useParams()
  const getBookedCarDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.cardetails);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookedCarDetail();
  }, []);
//  if(Object.keys(responseData).length === 0){
//       return null
//   }
  return (
    <>
      {/* <MetaData title="Order Details" /> */}
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Car Booking Details</Typography>
          <Typography component="h1">car # {responseData._id}</Typography>
          <Typography>Contact Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData && responseData.CarContactInfo.firstName}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{responseData && responseData.CarContactInfo.phone}</span>
            </div>
            <div>
              <p>Email:</p>
              <span>{responseData && responseData.CarContactInfo.email}</span>
            </div>
            <div>
              <p>CNIC:</p>
              <span>{responseData && responseData.CarContactInfo.nic}</span>
            </div>
          </div>
     
          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={responseData && 
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
