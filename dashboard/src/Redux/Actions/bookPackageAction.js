import { CLEAR_ERRORS,ALL_BOOKED_PACKAGES_REQUEST,ALL_BOOKED_PACKAGES_SUCCESS,ALL_BOOKED_PACKAGES_FAIL, GET_BOOKED_PACKAGE_DETAIL_REQUEST, GET_BOOKED_PACKAGE_DETAIL_SUCCESS, GET_BOOKED_PACKAGE_DETAIL_FAIL } from "../Constants/bookPackageConstants";
import axios from "../helpers/axios";

// Get All Booked Packages (admin)
export const getAllBookedPackages = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_BOOKED_PACKAGES_REQUEST });
  
      const { data } = await axios.get("/admin/bookedPackages");
  
      dispatch({ type: ALL_BOOKED_PACKAGES_SUCCESS, payload: data.bookedPackages });
    } catch (error) {
      dispatch({
        type: ALL_BOOKED_PACKAGES_FAIL,
        payload: error.response.data.message,
      });
    }
  };