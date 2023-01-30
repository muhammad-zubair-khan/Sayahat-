import React, { Fragment, useEffect,useState } from "react";
import "../Packages/MyPackageDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import {
  clearErrors, deleteBookedHotel,
} from "../../../Redux/Actions/bookHotelAction";
import axios from "../../../Redux/helpers/axios";
import { useHistory, useParams } from "react-router-dom";
import {Button} from '@mui/material'
import MetaData from "../../../Components/MetaData/MetaData";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const MyHotelDetails = (props) => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  // const { error, loading, hotel } = useSelector(
  //   (state) => state.myHotelDetails
  // );
  // const hotels = useSelector((state) => state.myHotelDetails);
  let [responseData, setResponseData] = useState("");
  const url = `https://sayahat-api.onrender.com/api/bookHotelDetail`;

  const getBookedHotelDetail = async () => {
    const id = props.location.params.id;
    try {
      const res = await axios.get(`${url}/${id}`);
      setResponseData(res.data.hoteldetails);
    } catch (err) {console.log(err)}
  };

  const cancelAndRefundBooking = () =>{
    var txt;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to cancel booking?")) {
      txt = "The money will be returned to you within 24 hours";
      dispatch(deleteBookedHotel(id))
      alert(txt)
      history.push('/myHotels')
    }else{
      history.push('/myHotels')
    } 
  }

  useEffect(() => {
    getBookedHotelDetail()
  }, []);

  return (
    <Fragment>
      {/* {loading ? (
        // <Loader />
        "loading"
      ) : ( */}
        <Fragment>
          {/* <MetaData title="Order Details" /> */}
      <MetaData title={`Hotel Detais`} />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Hotel # {responseData && responseData._id}
              </Typography>
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
                  <span>
                    {responseData && responseData.hotelContactInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>
                    {responseData && responseData.hotelContactInfo.email}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      responseData && responseData.paymentInfo.status === "succeeded"
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
                  {/* <p>Pickup Time:</p>
                  <span>{responseData && responseData.hotelActivityInfo.time}</span> */}
                </div>
                <div>
                  <p>Reserved Dates:</p>
                  <span>{`${
                    responseData && responseData.hotelActivityInfo.dates[0].startDate
                  } to ${
                    responseData && responseData.hotelActivityInfo.dates[0].endDate
                  }`}</span>
                </div>
                <div>
                  <p>Adult and Chidlren</p>
                  <span>{`${
                    responseData && responseData.hotelActivityInfo.options[0].adult
                  } and ${
                    responseData && responseData.hotelActivityInfo.options[0].children
                  }`}</span>
                </div>
                <div>
                  <p>Refundable?</p>
                  <span>{responseData && responseData.fullyRefundable}</span>
                  <span>{responseData && responseData.fullyRefundable === 'Yes' ? <Button onClick={cancelAndRefundBooking}  variant="contained" color="error">Cancel Booking</Button> : ""}</span>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default MyHotelDetails;
