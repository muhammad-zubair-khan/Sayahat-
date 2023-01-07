import axios from "../helpers/axios";
import { CLEAR_ERRORS, MY_CAR_FAIL, MY_CAR_REQUEST, MY_CAR_SUCCESS, NEW_CAR_BOOKING_FAIL, NEW_CAR_BOOKING_REQUEST, NEW_CAR_BOOKING_SUCCESS, CAR_DETAILS_FAIL, CAR_DETAILS_REQUEST, CAR_DETAILS_SUCCESS } from "../Constants/bookCarConstants";

// Book Car
export const bookedCar = (bookCar) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CAR_BOOKING_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/book/car", bookCar, config);
  
      dispatch({ type: NEW_CAR_BOOKING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: NEW_CAR_BOOKING_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// My Cars
export const myCars = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CAR_REQUEST });

    const { data } = await axios.get("/bookCar/me");

    dispatch({ type: MY_CAR_SUCCESS, payload: data.cars });
  } catch (error) {
    dispatch({
      type: MY_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Car Details
export const getCarDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAR_DETAILS_REQUEST });

    const { data } = await axios.get(`/bookCarDetail/${id}`);

    dispatch({ type: CAR_DETAILS_SUCCESS, payload: data.car });
  } catch (error) {
    dispatch({
      type: CAR_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};