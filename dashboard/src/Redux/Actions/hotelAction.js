import {
  GET_HOTEL_BY_SLUG_REQUEST,
  GET_HOTEL_BY_SLUG_SUCCESS,
  GET_HOTEL_BY_SLUG_FAIL,
  CREATE_NEW_HOTEL_REQUEST,
  CREATE_NEW_HOTEL_SUCCESS,
  CREATE_NEW_HOTEL_FAIL,
  GET_ALL_HOTELS_REQUEST,
  GET_ALL_HOTELS_SUCCESS,
  GET_ALL_HOTELS_FAIL,
  DELETE_HOTEL_REQUEST,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_FAIL,
  GET_HOTEL_DETAILS_REQUEST,
  GET_HOTEL_DETAILS_SUCCESS,
  GET_HOTEL_DETAILS_FAIL,
} from "../Constants/hotelConstants";
import axios from "../helpers/axios";

export const createHotel = (hotelData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEW_HOTEL_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    const { data } = await axios.post(
      `/vacation/Hotel/add`,
      hotelData
      // config
    );

    dispatch({
      type: CREATE_NEW_HOTEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Hotels For Admin
export const getAllHotels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOTELS_REQUEST });

    const { data } = await axios.get("/admin/hotels");

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

//get Hotel by Slug
export const getHotelBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/admin/hotels/${slug}`);
    dispatch({
      type: GET_HOTEL_BY_SLUG_SUCCESS,
      payload: data.hotels,
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Hotel
export const deleteHotel = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_HOTEL_REQUEST });

    const { data } = await axios.post(`/admin/vacation/hotel/${id}`);

    dispatch({
      type: DELETE_HOTEL_SUCCESS,
      payload: data.success,
    });
    dispatch({
      type: GET_ALL_HOTELS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getHotelDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_DETAILS_REQUEST });
    // const { productId } = payload.params;
    const { data } = await axios.get(`/admin/hotel/${id}`);
    dispatch({
      type: GET_HOTEL_DETAILS_SUCCESS,
      payload: data.hotel,
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
