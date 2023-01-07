import React, { Fragment, useEffect } from "react";
import "../Packages/MyPackageDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getHotelsDetails,clearErrors } from "../../../Redux/Actions/bookHotelAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const MyHotelDetails = ({ match }) => {
  const { error, loading,hotel } = useSelector((state) => state.myHotelDetails);
  const hotels = useSelector((state) => state.myHotelDetails);
  const {id} = useParams()

  const dispatch = useDispatch();
//   const alert = useAlert();

  useEffect(() => {
    if (error) {
    //   alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getHotelsDetails(id));
  }, [dispatch,error,id]);

  if (Object.keys(hotels).length === 0) {
    return null;
  }


  return (
    <Fragment>
      {loading ? (
        // <Loader /> 
        "loading"
      ) : (
        <Fragment>
          {/* <MetaData title="Order Details" /> */}
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Hotel # {hotel && hotel._id}
              </Typography>
              <Typography>Contact Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{hotels.hotel && hotels.hotel.hotelContactInfo.firstName}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                  {hotels.hotel && hotels.hotel.hotelContactInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>
                  {hotels.hotel && hotels.hotel.hotelContactInfo.email}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      hotel &&
                      hotel.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    { hotel &&
                     hotel.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{hotel && hotel.price}</span>
                </div>
              </div>
              <Typography>Package Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                <p>Name:</p>
                  <span>{hotel && hotel.name}</span>
                </div>
                <div>
                {/* <p>Pickup Time:</p>
                  <span>{hotel && hotel.hotelActivityInfo.time}</span> */}
                </div>
                <div>
                <p>Reserved Dates:</p>
                  <span>{`${hotel && hotel.hotelActivityInfo.dates[0].startDate} to ${hotel && hotel.hotelActivityInfo.dates[0].endDate}`}</span>
                </div>
                <div>
                <p>Adult and Chidlren</p>
                  <span>{`${hotel && hotel.hotelActivityInfo.options[0].adult} and ${hotel && hotel.hotelActivityInfo.options[0].children}`}</span>
                </div>
                <div>
                <p>Refundable?</p>
                  <span>{hotel && hotel.FullyRefundable}</span>
                </div>
              </div>
            </div>          
          </div>
        </Fragment>
      )} 
    </Fragment>
  );
};

export default MyHotelDetails;