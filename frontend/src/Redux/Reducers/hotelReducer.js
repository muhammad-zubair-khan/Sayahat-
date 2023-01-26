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
  DELETE_HOTEL_RESET,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
  GET_ALL_FEATURED_HOTELS_REQUEST,
  GET_ALL_FEATURED_HOTELS_SUCCESS,
  GET_ALL_FEATURED_HOTELS_FAIL,
  GET_HOTEL_BY_ID_FAIL,
  GET_HOTEL_BY_ID_SUCCESS,
  GET_HOTEL_BY_ID_REQUEST,
} from "../Constants/hotelConstants";

const initialStateHotel = {
  hotel: {},
  loading: false,
};

export const newHotelReducer = (state = initialStateHotel, action) => {
  switch (action.type) {
    case CREATE_NEW_HOTEL_REQUEST:
      return {
        // ...state,
        hotel: {},
        loading: false,
      };
    case CREATE_NEW_HOTEL_SUCCESS:
      return {
        loading: true,
        success: true,
        hotel: action.payload,
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
        hotels: action.payload.hotels,
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
        priceRange: {},
        hotelsByPrice: {},
      };
    case GET_HOTEL_BY_SLUG_SUCCESS:
      return {
        loading: false,
        hotels: action.payload.hotels,
        priceRange: action.payload.priceRange,
        hotelsByPrice: {
          ...action.payload.hotelsByPrice,
        },
      };
    case GET_HOTEL_BY_SLUG_FAIL:
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

export const hotelReducer = (state = { hotel: {} }, action) => {
  switch (action.type) {
    case GET_HOTEL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_HOTEL_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        hotel: action.payload.hotel,
      };

    case GET_HOTEL_BY_ID_FAIL:
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

export const featuredHotelReducer = (state = { featuredHotels: [] }, action) => {
  switch (action.type) {
    case GET_ALL_FEATURED_HOTELS_REQUEST:
      return {
        loading: true,
        featuredHotels: [],
      };
    case GET_ALL_FEATURED_HOTELS_SUCCESS:
      return {
        loading: false,
        featuredHotels: action.payload.featuredHotels,
      };
    case GET_ALL_FEATURED_HOTELS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
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

export const hotelReviewsReducer = (state = { reviews: [] }, action) => {
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

export const reviewReducer = (state = {}, action) => {
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
