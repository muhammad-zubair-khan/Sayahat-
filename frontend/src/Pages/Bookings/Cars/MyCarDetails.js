import React, { Fragment, useEffect } from "react";
import "../Packages/MyPackageDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { clearErrors } from "../../../Redux/Actions/bookCarAction";
import { useState } from "react";
import axios from "../../../Redux/helpers/axios";
const MyCarDetails = (props) => {
  // const { error, loading } = useSelector((state) => state.myCarDetails);
  // const {car} = useSelector((state) => state.myCarDetails);
  const dispatch = useDispatch();
  let [responseData, setResponseData] = useState("");
  const url = `http://localhost:5000/api/bookCarDetail`;

  // const {id} = useParams()
  const getBookedCarDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.cardetails);
    } catch (err) {console.log(err)}
  };
  useEffect(() => {
    getBookedCarDetail();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //   //   alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch,  error]);

 
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
              {/* <Typography component="h1">
                car # {responseData && responseData._id}
              </Typography> */}
              <Typography>Contact Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{responseData && responseData.CarContactInfo.firstName}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                  {responseData && responseData.CarContactInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>
                  {responseData && responseData.CarContactInfo.email}
                  </span>
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
                    { responseData &&
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

              <Typography>car Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                <p>Name:</p>
                  <span>{responseData && responseData.name}</span>
                </div>
                <div>
                <p>From:</p>
                  <span>{responseData && responseData.From}</span>
                </div>
                <div>
                <p>To:</p>
                  <span>{responseData && responseData.To}</span>
                </div>
                <div>
                <p>Pickup Time:</p>
                  <span>{responseData && responseData.PickupTime}</span>
                </div>
                <div>
                <p>Dropoff Time:</p>
                  <span>{responseData && responseData.DropoffTime}</span>
                </div>
                <div>
                <p>Pickup Date:</p>
                  <span>{responseData && responseData.StartingDate}</span>
                </div>
                <div>
                <p>Dropoff Date:</p>
                  <span>{responseData && responseData.EndingDate}</span>
                </div>
                
              </div>
            </div>

          
          </div>
        </Fragment>
      {/* // )} */}
    </Fragment>
  )
}
export default MyCarDetails;