import {
    GET_HOTEL_BY_SLUG_REQUEST,
    GET_HOTEL_BY_SLUG_SUCCESS,
    GET_HOTEL_BY_SLUG_FAIL,
    CREATE_NEW_HOTEL_REQUEST,
    CREATE_NEW_HOTEL_SUCCESS,
    CREATE_NEW_HOTEL_FAIL,
    CREATE_NEW_HOTEL_RESET,
    GET_ALL_HOTELS_REQUEST,
    GET_ALL_HOTELS_SUCCESS,
    GET_ALL_HOTELS_FAIL,
    DELETE_HOTEL_REQUEST,
    DELETE_HOTEL_SUCCESS,
    DELETE_HOTEL_FAIL,
  } from "../Constants/hotelConstants";
  import axios from "../helpers/axios";

// Create New Hotel
export const createHotel = (form) => {
  return async dispatch => {
    dispatch({ type:  CREATE_NEW_HOTEL_REQUEST });
    try {
      const res = await axios.post("/vacation/Hotel/add", form);
      console.log("res......",res)
      if (res.status === 201) {
        dispatch({
          type: CREATE_NEW_HOTEL_SUCCESS,
          payload: res.data.hotel,
        });
      } else {
        dispatch({
          type: CREATE_NEW_HOTEL_FAIL,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.message);
    //   if(e instance of BSONTypeError){
    //  }
    }

  };
};

// Get All Hotels For Admin
export const getAllHotels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_HOTELS_REQUEST });

    const { data } = await axios.get("/all-hotels");

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

//get Product by Slug
export const getHotelBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_HOTEL_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/hotels/${slug}`);
    console.log(data);
    dispatch({
      type: GET_HOTEL_BY_SLUG_SUCCESS,
      payload: data.hotels,
    });
  } catch (error) {
    dispatch({
      type: GET_HOTEL_BY_SLUG_FAIL,
      // payload: error.response.data.message,
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
