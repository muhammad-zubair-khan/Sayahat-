import {
  ALL_BOOKED_PACKAGES_REQUEST,
  ALL_BOOKED_PACKAGES_SUCCESS,
  ALL_BOOKED_PACKAGES_FAIL,
  DELETE_BOOKED_PACKAGE_REQUEST,
  DELETE_BOOKED_PACKAGE_SUCCESS,
  DELETE_BOOKED_PACKAGE_FAIL,
} from "../Constants/bookPackageConstants";
import axios from "../helpers/axios";

// Get All Booked Packages (admin)
export const getAllBookedPackages = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BOOKED_PACKAGES_REQUEST });

    const { data } = await axios.get("/admin/bookedPackages");

    dispatch({
      type: ALL_BOOKED_PACKAGES_SUCCESS,
      payload: data.bookedPackages,
    });
  } catch (error) {
    dispatch({
      type: ALL_BOOKED_PACKAGES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Booked Package
export const deleteBookedPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKED_PACKAGE_REQUEST });

    const { data } = await axios.delete(`/admin/bookedPackage/delete/${id}`);

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