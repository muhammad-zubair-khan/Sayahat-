import {
    GET_ALL_DESTINATIONS_REQUEST,
    GET_ALL_DESTINATIONS_SUCCESS,
    GET_ALL_DESTINATIONS_FAIL,
    GET_DESTINATION_BY_SLUG_REQUEST,
    GET_DESTINATION_BY_SLUG_SUCCESS,
    GET_DESTINATION_BY_SLUG_FAIL,
    NEW_DESTINATION_REQUEST,
    NEW_DESTINATION_SUCCESS,
    NEW_DESTINATION_FAIL,
    NEW_DESTINATION_RESET,
  } from "../Constants/topDestionationsConstant";
  
  export const destinationReducer = (state = { destinations: [] }, action) => {
    switch (action.type) {
      case GET_ALL_DESTINATIONS_REQUEST:
        return {
          loading: true,
          destinations: [],
        };
      case GET_ALL_DESTINATIONS_SUCCESS:
        return {
          loading: false,
          destinations: action.payload,
        };
      case GET_ALL_DESTINATIONS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case GET_DESTINATION_BY_SLUG_REQUEST:
        return {
          loading: true,
          destinations: [],
        };
      case GET_DESTINATION_BY_SLUG_SUCCESS:
        return {
          loading: false,
          destinations: [...action.payload],
        };
      case GET_DESTINATION_BY_SLUG_FAIL:
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
  // export const allCitiesReducer = (state = { products: [] }, action) => {
  //   switch (action.type) {
  //     case GET_ALL_VACATIONS_REQUEST:
  //       return {
  //         loading: true,
  //         products: [],
  //       };
  //     case GET_ALL_VACATIONS_SUCCESS:
  //       return {
  //         loading: false,
  //         products: action.payload,
  //       };
  //     case GET_ALL_VACATIONS_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  
  //     case GET_VACATION_PRODUCTS_BY_SLUG_REQUEST:
  //       return {
  //         loading: true,
  //         products: [],
  //       };
  //     case GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS:
  //       return {
  //         loading: false,
  //         products: [...action.payload],
  //       };
  //     case GET_VACATION_PRODUCTS_BY_SLUG_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  //     // case CLEAR_ERRORS:
  //     //   return {
  //     //     ...state,
  //     //     error: null,
  //     //   };
  //     default:
  //       return state;
  //   }
  // };
  
  const initialStateVacationProduct = {
    destination:{},
    loading:false
  }
  
  export const addNewDestinationReducer = (state = initialStateVacationProduct, action) => {
    switch (action.type) {
      case NEW_DESTINATION_REQUEST:
        return {
          // ...state,
          destination:{},
          loading: false,
        };
      case NEW_DESTINATION_SUCCESS:
        return {
          loading: true,
          success: true,
          destination: action.payload,
        };
      case NEW_DESTINATION_FAIL:
        return {
          // ...state,
          success: false,
          loading: false,
          error: action.payload,
        };
      case NEW_DESTINATION_RESET:
        return {
            destination: {},
          success: false,
        };
  
      default:
        return state;
    }
  };