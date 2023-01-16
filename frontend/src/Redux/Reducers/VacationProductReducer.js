import {
  GET_ALL_VACATION_PRODUCTS_REQUEST,
  GET_ALL_VACATION_PRODUCTS_SUCCESS,
  GET_ALL_VACATION_PRODUCTS_FAIL,
  GET_VACATION_PRODUCTS_BY_SLUG_REQUEST,
  GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS,
  GET_VACATION_PRODUCTS_BY_SLUG_FAIL,
  NEW_VACATION_PRODUCT_REQUEST,
  NEW_VACATION_PRODUCT_SUCCESS,
  NEW_VACATION_PRODUCT_FAIL,
  NEW_VACATION_PRODUCT_RESET,
  GET_PRODUCT_DETAIL_BY_ID_REQUEST,
  GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
  GET_PRODUCT_DETAIL_BY_ID_FAIL,
} from "../Constants/vacationProductConstants";

export const vacationProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_ALL_VACATION_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_ALL_VACATION_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_ALL_VACATION_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_VACATION_PRODUCTS_BY_SLUG_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS:
      return {
        loading: false,
        products: [...action.payload],
      };
    case GET_VACATION_PRODUCTS_BY_SLUG_FAIL:
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

const initialStateVacationProduct = {
  product: {},
  loading: false,
};

export const addCitiesReducer = (
  state = initialStateVacationProduct,
  action
) => {
  switch (action.type) {
    case NEW_VACATION_PRODUCT_REQUEST:
      return {
        // ...state,
        product: {},
        loading: false,
      };
    case NEW_VACATION_PRODUCT_SUCCESS:
      return {
        loading: true,
        success: true,
        product: action.payload,
      };
    case NEW_VACATION_PRODUCT_FAIL:
      return {
        // ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case NEW_VACATION_PRODUCT_RESET:
      return {
        product: {},
        success: false,
      };
    case GET_PRODUCT_DETAIL_BY_ID_REQUEST:
      return {
        loading: true,
        product: {},
      };
    case GET_PRODUCT_DETAIL_BY_ID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAIL_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
