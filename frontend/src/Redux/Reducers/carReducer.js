import {
    GET_ALL_VACATION_PRODUCTS_REQUEST,
    GET_ALL_VACATION_PRODUCTS_SUCCESS,
    GET_ALL_VACATION_PRODUCTS_FAIL,
    GET_CAR_BY_SLUG_REQUEST,
    GET_CAR_BY_SLUG_SUCCESS,
    GET_CAR_BY_SLUG_FAIL,
    CREATE_NEW_CAR_REQUEST,
    CREATE_NEW_CAR_SUCCESS,
    CREATE_NEW_CAR_FAIL,
    CREATE_NEW_CAR_RESET,
    GET_ALL_CARS_REQUEST,
    GET_ALL_CARS_SUCCESS,
    GET_ALL_CARS_FAIL,
    DELETE_HOTEL_REQUEST,
    DELETE_HOTEL_SUCCESS,
    DELETE_HOTEL_FAIL,
    DELETE_HOTEL_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    CLEAR_ERRORS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET
  } from "../Constants/carConstants";

  const initialStateHotel = {
    car:{},
    loading:false
  }
  
  export const newCarReducer = (state = initialStateHotel, action) => {
    switch (action.type) {
      case CREATE_NEW_CAR_REQUEST:
        return {
          // ...state,
          car:{},
          loading: false,
        };
      case CREATE_NEW_CAR_SUCCESS:
        return {
          loading: true,
          success: true,
          car: action.payload,
        };
      case CREATE_NEW_CAR_FAIL:
        return {
          // ...state,
          success: false,
          loading: false,
          error: action.payload,
        };
      case CREATE_NEW_CAR_RESET:
        return {
          car: {},
          success: false,
        };
  
      default:
        return state;
    }
  };

  export const allCarsReducer = (state = { cars: [] }, action) => {
    switch (action.type) {
      case GET_ALL_CARS_REQUEST:
        return {
          loading: true,
          cars: [],
        };
      case GET_ALL_CARS_SUCCESS:
        return {
          loading: false,
          cars: action.payload,
        };
      case GET_ALL_CARS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case GET_CAR_BY_SLUG_REQUEST:
        return {
          loading: true,
          cars: [],
        };
      case GET_CAR_BY_SLUG_SUCCESS:
        return {
          loading: false,
          cars: [...action.payload],
        };
      case GET_CAR_BY_SLUG_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      // case CLEAR_ERRORS:
      //   return {
      //     ...state,
      //     error: null,
      //   };
      default:
        return state;
    }
  };

  export const newReviewCarReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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
  
  export const carReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
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
  
  export const reviewCarReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      default:
        return state;
    }
  };
  