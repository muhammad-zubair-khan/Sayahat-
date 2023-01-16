import axios from "../helpers/axios";
import {
  CLEAR_ERRORS,
  MY_PACKAGE_FAIL,
  MY_PACKAGE_REQUEST,
  MY_PACKAGE_SUCCESS,
  NEW_PACKAGE_BOOKING_FAIL,
  NEW_PACKAGE_BOOKING_REQUEST,
  NEW_PACKAGE_BOOKING_SUCCESS,
  PACKAGE_DETAILS_FAIL,
  PACKAGE_DETAILS_REQUEST,
  PACKAGE_DETAILS_SUCCESS,
  DELETE_BOOKED_PACKAGE_REQUEST,
  DELETE_BOOKED_PACKAGE_SUCCESS,
  DELETE_BOOKED_PACKAGE_FAIL,
} from "../Constants/bookPackageConstants";

// Book Package
export const bookPackage = (bookPkg) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PACKAGE_BOOKING_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/book/package", bookPkg, config);

    dispatch({ type: NEW_PACKAGE_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PACKAGE_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Packages
export const myPackages = () => async (dispatch) => {
  try {
    dispatch({ type: MY_PACKAGE_REQUEST });

    const { data } = await axios.get("/bookPackage/me");

    dispatch({ type: MY_PACKAGE_SUCCESS, payload: data.packages });
  } catch (error) {
    dispatch({
      type: MY_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Pakcage Details
export const getPackageDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PACKAGE_DETAILS_REQUEST });

    const { data } = await axios.get(`/bookPackageDetail/${id}`);

    dispatch({ type: PACKAGE_DETAILS_SUCCESS, payload: data.package });
  } catch (error) {
    dispatch({
      type: PACKAGE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


// Delete Booked Package
export const deleteBookedPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKED_PACKAGE_REQUEST });

    const { data } = await axios.delete(`/bookedPackage/delete/${id}`);

    dispatch({
      type: DELETE_BOOKED_PACKAGE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKED_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};