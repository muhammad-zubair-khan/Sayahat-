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
  DELETE_BOOKED_HOTEL_REQUEST,
  DELETE_BOOKED_HOTEL_SUCCESS,
  DELETE_BOOKED_HOTEL_FAIL,
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

export const deleteBookedHotelReducer = (
  state = { bookedHotel: {} },
  action
) => {
  switch (action.type) {
    case DELETE_BOOKED_HOTEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOKED_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedHotel: action.payload,
        isDeleted: action.payload,
      };

    case DELETE_BOOKED_HOTEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
