import {
  SAVE_CAR_CONTACT_INFO,
  SAVE_CONTACT_INFO,
  SAVE_HOTEL_CONTACT_INFO,
} from "../Constants/checkoutConstants";
import axios from "axios";

// SAVE CONTACT INFO
export const saveContactInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_CONTACT_INFO,
    payload: data,
  });

  localStorage.setItem("contactInfo", JSON.stringify(data));
};

//Save Hotel Contact Info
export const saveHotelContactInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_HOTEL_CONTACT_INFO,
    payload: data,
  });

  localStorage.setItem("hotelContactInfo", JSON.stringify(data));
};

//Save Car Contact Info
export const saveCarContactInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_CAR_CONTACT_INFO,
    payload: data,
  });

  localStorage.setItem("CarContactInfo", JSON.stringify(data));
};
