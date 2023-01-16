import axios from "../helpers/axios";
import {
  CLEAR_ERRORS,
  MY_HOTEL_FAIL,
  MY_HOTEL_REQUEST,
  MY_HOTEL_SUCCESS,
  NEW_HOTEL_BOOKING_FAIL,
  NEW_HOTEL_BOOKING_REQUEST,
  NEW_HOTEL_BOOKING_SUCCESS,
  HOTEL_DETAILS_FAIL,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
  DELETE_BOOKED_HOTEL_REQUEST,
  DELETE_BOOKED_HOTEL_SUCCESS,
  DELETE_BOOKED_HOTEL_FAIL,
} from "../Constants/bookHotelConstants";

// Book Hotel
export const bookedHotel = (bookHotel) => async (dispatch) => {
  try {
    dispatch({ type: NEW_HOTEL_BOOKING_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/book/hotel", bookHotel, config);

    dispatch({ type: NEW_HOTEL_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_HOTEL_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Hotels
export const myHotels = () => async (dispatch) => {
  try {
    dispatch({ type: MY_HOTEL_REQUEST });

    const { data } = await axios.get("/bookHotel/me");

    dispatch({ type: MY_HOTEL_SUCCESS, payload: data.hotels });
  } catch (error) {
    dispatch({
      type: MY_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Hotel Details
export const getHotelsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: HOTEL_DETAILS_REQUEST });

    const { data } = await axios.get(`/bookHotelDetail/${id}`);

    dispatch({ type: HOTEL_DETAILS_SUCCESS, payload: data.hotel });
  } catch (error) {
    dispatch({
      type: HOTEL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Delete Booked Hotel
export const deleteBookedHotel = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKED_HOTEL_REQUEST });

    const { data } = await axios.delete(`/bookedHotel/delete/${id}`);

    dispatch({
      type: DELETE_BOOKED_HOTEL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKED_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};