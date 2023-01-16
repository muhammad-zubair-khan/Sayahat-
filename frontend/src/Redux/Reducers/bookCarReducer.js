import {
  CLEAR_ERRORS,
  MY_CAR_FAIL,
  MY_CAR_REQUEST,
  MY_CAR_SUCCESS,
  NEW_CAR_BOOKING_FAIL,
  NEW_CAR_BOOKING_REQUEST,
  NEW_CAR_BOOKING_SUCCESS,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  ALL_CARS_REQUEST,
  ALL_CARS_SUCCESS,
  ALL_CARS_FAIL,
} from "../Constants/bookCarConstants";

export const BookCarReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CAR_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_CAR_BOOKING_SUCCESS:
      return {
        loading: false,
        bookCar: action.payload,
      };

    case NEW_CAR_BOOKING_FAIL:
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

export const myCarsReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case MY_CAR_REQUEST:
      return {
        loading: true,
      };

    case MY_CAR_SUCCESS:
      return {
        loading: false,
        cars: action.payload,
      };

    case MY_CAR_FAIL:
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

export const carDetailsReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case CAR_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case CAR_DETAILS_SUCCESS:
      return {
        loading: false,
        car: action.payload,
      };

    case CAR_DETAILS_FAIL:
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

export const allBookedCarsReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case ALL_CARS_REQUEST:
      return {
        loading: true,
      };

    case ALL_CARS_SUCCESS:
      return {
        loading: false,
        cars: action.payload,
      };

    case ALL_CARS_FAIL:
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
