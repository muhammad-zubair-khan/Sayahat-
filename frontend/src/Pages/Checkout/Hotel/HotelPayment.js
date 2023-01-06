import React, { Fragment, useEffect, useRef, useState } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
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
import { getHotelDetailById } from "../../../Redux/Actions/hotelAction";
import { bookedHotel } from "../../../Redux/Actions/bookHotelAction";
// import { createOrder, clearErrors } from "../../actions/orderAction";

const HotelPayment = ({ history }) => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
const location = useLocation()
const params = useParams()
  const dispatch = useDispatch();
//   const alert = useAlert();
const [destination, setDestination] = useState(
    location.state.state.destination
  );
  const [dates, setDates] = useState(location.state.state.dates);
  const [options, setOptions] = useState(location.state.state.options);
  const [totalPrice, setTotalPrice] = useState(location.state.state.totalPrice);
  const [selectedRooms, setSelectedRooms] = useState(location.state.state.selectedRooms);
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { id } = useParams();
  const { hotel } = useSelector((state) => state.hotelById);

  const {user} = useSelector((state)=> state.auth)

  useEffect(() => {
    dispatch(getHotelDetailById(id));
  }, [dispatch,id]);

// const {}
  const { hotelContactInfo } = useSelector((state) => state.hotelContactCheckout);
  //   const { error } = useSelector((state) => state.newOrder);
  const hotelActivityInfo = JSON.parse(sessionStorage.getItem("hotelActivityInfo"));
  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const bookHotel = {
    name:  hotel.name,
    price: totalPrice,
    city:hotel.city,
    rooms: selectedRooms,
    fullyRefundable:hotel.FullyRefundable,
    hotelContactInfo,
    hotelActivityInfo,
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
        "http://localhost:5000/api/payment/process",
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
              city: hotel.city,
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
          bookHotel.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(bookedHotel(bookHotel));

          history.push("/hotel/booking/success");
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
      {/* <MetaData title="Payment" /> */}
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
  );
};

export default HotelPayment;