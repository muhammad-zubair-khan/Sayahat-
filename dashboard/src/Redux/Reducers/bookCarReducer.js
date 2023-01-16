import {
  CLEAR_ERRORS,
  ALL_BOOKED_CARS_REQUEST,
  ALL_BOOKED_CARS_SUCCESS,
  ALL_BOOKED_CARS_FAIL,
  GET_BOOKED_CAR_DETAIL_REQUEST,
  GET_BOOKED_CAR_DETAIL_SUCCESS,
  GET_BOOKED_CAR_DETAIL_FAIL,
} from "../Constants/bookCarConstants";

export const allBookedCarsReducer = (state = { bookedCars: [] }, action) => {
  switch (action.type) {
    case ALL_BOOKED_CARS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BOOKED_CARS_SUCCESS:
      return {
        loading: false,
        bookedCars: action.payload,
      };

    case ALL_BOOKED_CARS_FAIL:
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

export const bookedCarDetailReducer = (state = { bookedCar: {} }, action) => {
  switch (action.type) {
    case GET_BOOKED_CAR_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_BOOKED_CAR_DETAIL_SUCCESS:
      return {
        loading: false,
        bookedCar: action.payload,
      };
    case GET_BOOKED_CAR_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
