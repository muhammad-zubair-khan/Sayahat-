import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
// import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "../../Payment/Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useLocation, useParams } from "react-router-dom";
import { getCarById } from "../../../Redux/Actions/carAction";
import { bookedCar } from "../../../Redux/Actions/bookCarAction";
import MetaData from "../../../Components/MetaData/MetaData";

const CarPayment = ({ history }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(location.state.state.totalPrice);
  const [startDestination, setStartDestination] = useState(
    location.state.state.startDestination
  );
  const [endDestination, setEndDestination] = useState(
    location.state.state.endDestination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [pickupTime, setPickupTime] = useState(location.state.state.pickupTime);
  const [dropoffTime, setDropoffTime] = useState(
    location.state.state.dropoffTime
  );
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { id } = useParams();
  const { car } = useSelector((state) => state.addCarReducer);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  const { CarContactInfo } = useSelector((state) => state.carContactCheckout);
  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const bookCar = {
    name: car.name,
    price: totalPrice,
    pickupDestination: car.city,
    From: startDestination,
    To: endDestination,
    StartingDate: dates[0].startDate,
    EndingDate: dates[0].endDate,
    PickupTime: pickupTime,
    DropoffTime: dropoffTime,
    CarContactInfo,
  };
  const bookingMail = async () => {
    // e.preventDefault();
    const res = await axios("https://sayahat-api.onrender.com/api/sendCarBookingMail", {
      method: "POST",
      data: bookCar,
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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://sayahat-api.onrender.com/api/payment/process",
        paymentData,
        config
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
              city: car.city,
              //   line1: shippingInfo.address,
              //   state: shippingInfo.state,
              //   postal_code: shippingInfo.pinCode,
              //   country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          bookCar.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(bookedCar(bookCar));
          bookingMail()
          history.push("/car/booking/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      // alert.error(error.response.data.message);
    }
  };
  return (
    <>
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
              value={`Pay - PKR ${totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </Fragment>
    </>
  );
};

export default CarPayment;
