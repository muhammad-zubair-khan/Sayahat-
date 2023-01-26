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
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  CLEAR_ERRORS,
  GET_ALL_FEATURED_HOTELS_REQUEST,
  GET_ALL_FEATURED_HOTELS_SUCCESS,
  GET_ALL_FEATURED_HOTELS_FAIL,
  GET_HOTEL_BY_ID_REQUEST,
  GET_HOTEL_BY_ID_SUCCESS,
  GET_HOTEL_BY_ID_FAIL,
} from "../Constants/hotelConstants";
import axios from "../helpers/axios";

// Create New Hotel
export const createHotel = (form) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NEW_HOTEL_REQUEST });
    try {
      const res = await axios.post("/vacation/Hotel/add", form);
      // console.log("res......", res);
      // if (res.status === 201) {
        dispatch({
          type: CREATE_NEW_HOTEL_SUCCESS,
          payload: res.data.hotel,
        });
      // } else {
        // }
    } catch (error) {
        dispatch({
          type: CREATE_NEW_HOTEL_FAIL,
          payload: error.response.data.message,
        });
      // console.log(error.message);
      //   if(e instance of BSONTypeError){
      //  }
    }
  };
};

// Get All Hotels
export const getHotels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOTELS_REQUEST });
    const { data } = await axios.get(`/hotels`);
    dispatch({
      type: GET_ALL_HOTELS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_HOTELS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Searched Hotel
export const getAllHotels =
  (type, min, max, ratings, destination) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_HOTELS_REQUEST });
      let link = `/all-hotels?city=${destination}&min=${min || 0}&max=${
        max || 9999
      }&ratings=${ratings || 0}`;
      if (type) {
        link = `/all-hotels?city=${destination}&type=${type}&min=${
          min || 0
        }&max=${max || 9999}&ratings=${ratings || 0}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: GET_ALL_HOTELS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_HOTELS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Get Featured Hotel
export const getFeaturedHotels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FEATURED_HOTELS_REQUEST });
    let link = `/allfeaturedhotels?featured=${true}&limit=${4}`;

    const { data } = await axios.get(link);
    dispatch({
      type: GET_ALL_FEATURED_HOTELS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEATURED_HOTELS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Product by Slug
export const getHotelBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/hotels/${slug}`);
    dispatch({
      type: GET_HOTEL_BY_SLUG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Package detail By Id
export const getHotelDetailById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_BY_ID_REQUEST });
    const { data } = await axios.get(`/hotel/${id}`);
    dispatch({
      type: GET_HOTEL_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_BY_ID_FAIL,
      payload: error.response,
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
    });
  } catch (error) {
    dispatch({
      type: DELETE_HOTEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Hotel
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, hotelId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/reviews?id=${reviewId}&hoteltId=${hotelId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
