import React, { Fragment, useEffect, useState } from "react";
import "./MyPackageDetails.css";
// import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import axios from "axios";

const MyPackageDetails = (props) => {
  let [responseData, setResponseData] = useState("");
  const url = `http://localhost:5000/api/bookPackageDetail`;

  // const {id} = useParams()
  const getBookedPackageDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.packageDetails);
    } catch (err) {}
  };
  useEffect(() => {
    getBookedPackageDetail();
  }, []);

  // if (Object.keys(packages).length === 0) {
  //   return null;
  // }

  return (
    <Fragment>
      {/* {loading ? (
        // <Loader />
        "Loading"
      ) : ( */}
      <Fragment>
        {/* <MetaData title="Order Details" /> */}
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">
              {/* Package # {responseData.package._id} */}
            </Typography>
            <Typography>Contact Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>
                  {responseData && responseData.contactInfo.firstName}
                </span>
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
                  className={
                    responseData &&
                    responseData.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {responseData &&
                  responseData.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>{responseData && responseData.price}</span>
              </div>
            </div>

            <Typography>Package Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{responseData && responseData.name}</span>
              </div>
              <div>
                <p>Pickup Time:</p>
                <span>{responseData && responseData.activityInfo.time}</span>
              </div>
              <div>
                <p>Reserved Date:</p>
                <span>{`${
                  responseData && responseData.activityInfo.dates
                }`}</span>
              </div>
              <div>
                <p>Adult and Chidlren</p>
                <span>{`${
                  responseData && responseData.activityInfo.options[0].adult
                } and ${
                  responseData && responseData.activityInfo.options[0].children
                }`}</span>
              </div>
              <div>
                <p>Refundable?</p>
                <span>{responseData && responseData.refundable}</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default MyPackageDetails;
