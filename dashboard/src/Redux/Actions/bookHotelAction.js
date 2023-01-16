import {
  ALL_BOOKED_HOTELS_REQUEST,
  ALL_BOOKED_HOTELS_SUCCESS,
  ALL_BOOKED_HOTELS_FAIL,
  DELETE_BOOKED_HOTEL_REQUEST,
  DELETE_BOOKED_HOTEL_SUCCESS,
  DELETE_BOOKED_HOTEL_FAIL,
} from "../Constants/bookHotelConstants";
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


// Delete Booked Hotel
export const deleteBookedHotel = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKED_HOTEL_REQUEST });

    const { data } = await axios.delete(`/admin/bookedHotel/delete/${id}`);

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