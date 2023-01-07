import React, { Fragment, useEffect } from "react";
import "../Packages/MyPackageDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getCarDetails, clearErrors } from "../../../Redux/Actions/bookCarAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const MyCarDetails = ({ match }) => {
  const { error, loading } = useSelector((state) => state.myCarDetails);
  const {car} = useSelector((state) => state.myCarDetails);

  const dispatch = useDispatch();
//   const alert = useAlert();

  useEffect(() => {
    if (error) {
    //   alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getCarDetails(match.params.id));
  }, [dispatch,  error, match.params.id]);

  // if (Object.keys(cars.car).length === 0) {
  //   return null;
  // }
  // if (Object.keys(car).length === 0) {
  //   return null;
  // }
  return (
    <Fragment>
      {loading ? (
        // <Loader />
        "Loading"
      ) : (
        <Fragment>
          {/* <MetaData title="Order Details" /> */}
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                car # {car && car._id}
              </Typography>
              <Typography>Contact Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{car && car.CarContactInfo.firstName}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                  {car && car.CarContactInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>
                  {car && car.CarContactInfo.email}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      car &&
                      car.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    { car &&
                     car.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{car && car.price}</span>
                </div>
              </div>

              <Typography>car Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                <p>Name:</p>
                  <span>{car && car.name}</span>
                </div>
                <div>
                <p>From:</p>
                  <span>{car && car.From}</span>
                </div>
                <div>
                <p>To:</p>
                  <span>{car && car.To}</span>
                </div>
                <div>
                <p>Pickup Time:</p>
                  <span>{car && car.PickupTime}</span>
                </div>
                <div>
                <p>Dropoff Time:</p>
                  <span>{car && car.DropoffTime}</span>
                </div>
                <div>
                <p>Pickup Date:</p>
                  <span>{car && car.StartingDate}</span>
                </div>
                <div>
                <p>Dropoff Date:</p>
                  <span>{car && car.EndingDate}</span>
                </div>
                
              </div>
            </div>

          
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
export default MyCarDetails;