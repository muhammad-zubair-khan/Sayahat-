import {
  GET_ALL_VACATION_PRODUCTS_REQUEST,
  GET_ALL_VACATION_PRODUCTS_SUCCESS,
  GET_ALL_VACATION_PRODUCTS_FAIL,
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
  DELETE_HOTEL_RESET,
  GET_TOP_DES_HOTEL_BY_SLUG_REQUEST,
  GET_TOP_DES_HOTEL_BY_SLUG_SUCCESS,
  GET_TOP_DES_HOTEL_BY_SLUG_FAIL,
  GET_HOTEL_DETAILS_REQUEST,
  GET_HOTEL_DETAILS_SUCCESS,
  GET_HOTEL_DETAILS_FAIL,
} from "../Constants/hotelConstants";

const initialStateHotel = {
  hotel: {},
  loading: false,
};

export const newHotelReducer = (state = { hotel: {} }, action) => {
  switch (action.type) {
    case CREATE_NEW_HOTEL_REQUEST:
      return {
        ...state,
        // hotel: {},
        loading: true,
      };
    case CREATE_NEW_HOTEL_SUCCESS:
      return {
        loading: false,
        success: true,
        hotel: action.payload.hotel,
      };
    case CREATE_NEW_HOTEL_FAIL:
      return {
        // ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case CREATE_NEW_HOTEL_RESET:
      return {
        hotel: {},
        success: false,
      };
      case GET_HOTEL_DETAILS_REQUEST:
        return {
          loading: true,
          ...state
        };
      case GET_HOTEL_DETAILS_SUCCESS:
        return {
          loading: false,
          hotel: action.payload,
        };
      case GET_HOTEL_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export const allHotelsReducer = (state = { hotels: [] }, action) => {
  switch (action.type) {
    case GET_ALL_HOTELS_REQUEST:
      return {
        loading: true,
        hotels: [],
      };
    case GET_ALL_HOTELS_SUCCESS:
      return {
        loading: false,
        hotels: action.payload,
      };
    case GET_ALL_HOTELS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_HOTEL_BY_SLUG_REQUEST:
      return {
        loading: true,
        hotels: [],
      };
    case GET_HOTEL_BY_SLUG_SUCCESS:
      return {
        loading: false,
        hotels: [...action.payload],
      };
    case GET_HOTEL_BY_SLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_TOP_DES_HOTEL_BY_SLUG_REQUEST:
      return {
        loading: true,
        hotels: [],
      };
    case GET_TOP_DES_HOTEL_BY_SLUG_SUCCESS:
      return {
        loading: false,
        hotels: [...action.payload],
      };
    case GET_TOP_DES_HOTEL_BY_SLUG_FAIL:
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

export const hotelsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_HOTEL_REQUEST:
      // case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    // case UPDATE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isUpdated: action.payload,
    //   };
    case DELETE_HOTEL_FAIL:
      // case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_HOTEL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    // case UPDATE_PRODUCT_RESET:
    //   return {
    //     ...state,
    //     isUpdated: false,
    //   };
    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };
    default:
      return state;
  }
};
