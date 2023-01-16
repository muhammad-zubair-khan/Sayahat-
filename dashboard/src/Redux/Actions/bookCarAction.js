import axios from "../helpers/axios";
import {
  CLEAR_ERRORS,
  ALL_BOOKED_CARS_REQUEST,
  ALL_BOOKED_CARS_SUCCESS,
  ALL_BOOKED_CARS_FAIL,
  GET_BOOKED_CAR_DETAIL_REQUEST,
  GET_BOOKED_CAR_DETAIL_FAIL,
  GET_BOOKED_CAR_DETAIL_SUCCESS,
  DELETE_BOOKED_CAR_REQUEST,
  DELETE_BOOKED_CAR_SUCCESS,
  DELETE_BOOKED_CAR_FAIL,
} from "../Constants/bookCarConstants";

// Get All Booked Cars (admin)
export const getAllBookedCars = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKED_CARS_REQUEST });

    const { data } = await axios.get("/admin/bookedCars");

    dispatch({ type: ALL_BOOKED_CARS_SUCCESS, payload: data.bookedCars });
  } catch (error) {
    dispatch({
      type: ALL_BOOKED_CARS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Booked Car Detail(admin)
export const getBookedCarDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BOOKED_CAR_DETAIL_REQUEST });

    const { data } = await axios.get(`/admin/bookedCar/detail/${id}`);

    dispatch({ type: GET_BOOKED_CAR_DETAIL_SUCCESS, payload: data.cardetails });
  } catch (error) {
    dispatch({
      type: GET_BOOKED_CAR_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


// Delete Booked Car
export const deleteBookedCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKED_CAR_REQUEST });

    const { data } = await axios.delete(`/admin/bookedCar/delete/${id}`);

    dispatch({
      type: DELETE_BOOKED_CAR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKED_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};