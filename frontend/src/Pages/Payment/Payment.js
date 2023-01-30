import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { getPackageDetailById } from "../../Redux/Actions/packageAction";
import { useLocation, useParams } from "react-router-dom";
import { bookPackage } from "../../Redux/Actions/bookPackageAction";
import MetaData from "../../Components/MetaData/MetaData";
// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = ({ history }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [time, setTimes] = useState(location.state.state.time);
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { id } = useParams();
  const packages = useSelector((state) => state.addPackageReducer);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPackageDetailById(id));
  }, [dispatch, id]);
  // const {}
  const { contactInfo } = useSelector((state) => state.contactCheckout);
  const activityInfo = JSON.parse(sessionStorage.getItem("activityInfo"));
  const paymentData = {
    amount: Math.round(packages.package.price * 100),
  };

  const bookPkg = {
    name: packages.package.name,
    price: packages.package.price,
    pickUpTime: time,
    city: packages.package.city,
    refundable: packages.package.refundable,
    contactInfo,
    activityInfo,
  };
  const bookingMail = async () => {
    // e.preventDefault();
    const res = await axios("https://sayahat-api.onrender.com/api/sendPackageBookingMail", {
      method: "POST",
      data: bookPkg,
    });
    const result = await res.json();
    if (result.res === 201) {
      alert("Mail Send");
    } 
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      const { data } = await axios.post(
        "https://sayahat-api.onrender.com/api/payment/process",
        paymentData,
        // config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              city: packages.package.city,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          bookPkg.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(bookPackage(bookPkg));
          bookingMail()
          history.push("/package/reserve/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      // alert.error(error.response.data.message);
    }
  };

  //   useEffect(() => {
  //     if (error) {
  //       alert.error(error);
  //       dispatch(clearErrors());
  //     }
  //   }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={'Sayahat: Payment'} />
      {/* <CheckoutSteps activeStep={2} /> */}
      <div className="paymentContainer">
        {/* <form className="paymentForm"> */}
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - PKR${packages && packages.package.price}`}
            ref={payBtn}
            className="paymentFormBtn"
            // onClick={bookingMail}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
