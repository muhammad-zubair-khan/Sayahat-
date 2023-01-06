import {
    SAVE_CONTACT_INFO,
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