import { CLEAR_ERRORS,ALL_BOOKED_HOTELS_REQUEST,ALL_BOOKED_HOTELS_SUCCESS,ALL_BOOKED_HOTELS_FAIL, GET_BOOKED_HOTEL_DETAIL_REQUEST, GET_BOOKED_HOTEL_DETAIL_SUCCESS, GET_BOOKED_HOTEL_DETAIL_FAIL } from "../Constants/bookHotelConstants";
import axios from "../helpers/axios";

// Get All Booked Hotels (admin)
export const getAllBookedHotels = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_BOOKED_HOTELS_REQUEST });
  
      const { data } = await axios.get("/admin/bookedHotels");
  
      dispatch({ type: ALL_BOOKED_HOTELS_SUCCESS, payload: data.bookedHotels });
    } catch (error) {
      dispatch({
        type: ALL_BOOKED_HOTELS_FAIL,
        payload: error.response.data.message,
      });
    }
  };