import {
  CLEAR_ERRORS,
  MY_HOTEL_FAIL,
  MY_HOTEL_REQUEST,
  MY_HOTEL_SUCCESS,
  NEW_HOTEL_BOOKING_FAIL,
  NEW_HOTEL_BOOKING_REQUEST,
  NEW_HOTEL_BOOKING_SUCCESS,
  HOTEL_DETAILS_FAIL,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
} from "../Constants/bookHotelConstants";

export const BookHotelReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_HOTEL_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_HOTEL_BOOKING_SUCCESS:
      return {
        loading: false,
        bookHotel: action.payload,
      };

    case NEW_HOTEL_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myHotelsReducer = (state = { hotels: [] }, action) => {
  switch (action.type) {
    case MY_HOTEL_REQUEST:
      return {
        loading: true,
      };

    case MY_HOTEL_SUCCESS:
      return {
        loading: false,
        hotels: action.payload,
      };

    case MY_HOTEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const hotelDetailsReducer = (state = { hotel: {} }, action) => {
  switch (action.type) {
    case HOTEL_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case HOTEL_DETAILS_SUCCESS:
      return {
        loading: false,
        hotel: action.payload,
      };

    case HOTEL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
