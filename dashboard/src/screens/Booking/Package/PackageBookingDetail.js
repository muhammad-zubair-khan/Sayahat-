import React, { useEffect, useState } from "react";
// import { getBookedCarDetail } from '../../Redux/Actions/bookCarAction'
import { Typography } from "@mui/material";
import axios from "axios";
import '../CarBookingDetails.css'

const PackageBookingDetail = (props) => {
  let [responseData, setResponseData] = useState("");
  const url = `http://localhost:5000/api/admin/bookedPackage/detail`;

  // const {id} = useParams()
  const getBookedPackageDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.packagedetails);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookedPackageDetail();
  }, []);
//  if(Object.keys(responseData).length === 0){
//       return null
//   }
  return (
    <>
      {/* <MetaData title="Order Details" /> */}
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Package Booking Details</Typography>
          <Typography component="h1">package # {responseData._id}</Typography>
          <Typography>Contact Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData && responseData.contactInfo.firstName}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{responseData && responseData.contactInfo.phone}</span>
            </div>
            <div>
              <p>Email:</p>
              <span>{responseData && responseData.contactInfo.email}</span>
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

          <Typography>Package Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{responseData.name}</span>
            </div>
            <div>
              <p>Refundable:</p>
              <span>{responseData.refundable}</span>
            </div>
            <div>
              <p>Booking Dates:</p>
              <span>{responseData && responseData.activityInfo.dates}</span>
            </div>
            <div>
              <p>Time:</p>
              <span>{responseData && responseData.activityInfo.time}</span>
            </div>
            <div>
              <p>Adult:</p>
              <span>{responseData && responseData.activityInfo.options[0].adult}</span>
            </div>
            <div>
              <p>Children:</p>
              <span>{responseData && responseData.activityInfo.options[0].children}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageBookingDetail;
