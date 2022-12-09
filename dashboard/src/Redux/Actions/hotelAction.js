import {
    GET_ALL_VACATION_PRODUCTS_REQUEST,
    GET_ALL_VACATION_PRODUCTS_SUCCESS,
    GET_ALL_VACATION_PRODUCTS_FAIL,
    GET_VACATION_PRODUCTS_BY_SLUG_REQUEST,
    GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS,
    GET_VACATION_PRODUCTS_BY_SLUG_FAIL,
    NEW_HOTEL_REQUEST,
    NEW_HOTEL_SUCCESS,
    NEW_HOTEL_FAIL,
    NEW_HOTEL_RESET,
    GET_ALL_HOTELS_REQUEST,
    GET_ALL_HOTELS_SUCCESS,
    GET_ALL_HOTELS_FAIL,
    DELETE_HOTEL_REQUEST,
    DELETE_HOTEL_SUCCESS,
    DELETE_HOTEL_FAIL,
  } from "../Constants/hotelConstants";
  import axios from "../helpers/axios";

// Get All Hotels For Admin
export const getAllHotels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOTELS_REQUEST });

    const { data } = await axios.get("/hotels");

    dispatch({
      type: GET_ALL_HOTELS_SUCCESS,
      payload: data.hotels,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOTELS_FAIL,
      payload: error.response.data.message,
    });
  }
};

 // Delete Product
 export const deleteHotel = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HOTEL_REQUEST });

    const { data } = await axios.post(`/vacation/hotel/${id}`);

    dispatch({
      type: DELETE_HOTEL_SUCCESS,
      payload: data.success,
    });
    dispatch({
      type: GET_ALL_HOTELS_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};
