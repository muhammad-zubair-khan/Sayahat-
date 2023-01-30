import React, { Fragment, useEffect, useState } from "react";
import "./MyPackageDetails.css";
// import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import { useHistory,useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {deleteBookedPackage} from '../../../Redux/Actions/bookPackageAction'
import MetaData from "../../../Components/MetaData/MetaData";

const MyPackageDetails = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  let [responseData, setResponseData] = useState("");
  const url = `https://sayahat-api.onrender.com/api/bookPackageDetail`;

  // const {id} = useParams()
  const getBookedPackageDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.packageDetails);
    } catch (err) {console.log(err)}
  };

  const cancelBooking = () =>{
    var txt;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to cancel booking?")) {
      txt = "Deleted Successfully";
      dispatch(deleteBookedPackage(id))
      alert(txt)
      history.push('/myPackages')
    }else{
      history.push('/myPackages')
    } 
  }

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
      <MetaData title={`Package Details`} />
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
                <span>
                  {responseData &&
                  responseData.refundable === "Free cancellation available" ? (
                    <Button onClick={cancelBooking} variant="contained" color="error">
                      Cancel Booking
                    </Button>
                  ) : (
                    ""
                  )}
                </span>
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
