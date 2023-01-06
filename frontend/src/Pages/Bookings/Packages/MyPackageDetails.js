import React, { Fragment, useEffect } from "react";
import "./MyPackageDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getPackageDetails, clearErrors } from "../../../Redux/Actions/bookPackageAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const MyPackageDetails = ({ match }) => {
  const { error, loading } = useSelector((state) => state.myPackageDetails);
  const packages = useSelector((state) => state.myPackageDetails);

  const dispatch = useDispatch();
//   const alert = useAlert();

  useEffect(() => {
    if (error) {
    //   alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getPackageDetails(match.params.id));
  }, [dispatch,  error, match.params.id]);

//   if (Object.keys(packages.package).length === 0) {
//     return null;
//   }

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <Fragment>
          {/* <MetaData title="Order Details" /> */}
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Package # {packages.package && packages.package._id}
              </Typography>
              <Typography>Contact Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{packages.package && packages.package.contactInfo.firstName}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                  {packages.package && packages.package.contactInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Email:</p>
                  <span>
                  {packages.package && packages.package.contactInfo.email}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      packages.package &&
                      packages.package.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    { packages.package &&
                     packages.package.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{packages.package && packages.package.price}</span>
                </div>
              </div>

              <Typography>Package Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                <p>Name:</p>
                  <span>{packages.package && packages.package.name}</span>
                </div>
                <div>
                <p>Pickup Time:</p>
                  <span>{packages.package && packages.package.activityInfo.time}</span>
                </div>
                <div>
                <p>Reserved Dates:</p>
                  <span>{`${packages.package && packages.package.activityInfo.dates[0].startDate} to ${packages.package && packages.package.activityInfo.dates[0].endDate}`}</span>
                </div>
                <div>
                <p>Adult and Chidlren</p>
                  <span>{`${packages.package && packages.package.activityInfo.options[0].adult} and ${packages.package && packages.package.activityInfo.options[0].children}`}</span>
                </div>
                <div>
                <p>Refundable?</p>
                  <span>{packages.package && packages.package.refundable}</span>
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