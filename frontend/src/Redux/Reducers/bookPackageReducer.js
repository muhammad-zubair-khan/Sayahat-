import {
  CLEAR_ERRORS,
  MY_PACKAGE_FAIL,
  MY_PACKAGE_REQUEST,
  MY_PACKAGE_SUCCESS,
  NEW_PACKAGE_BOOKING_FAIL,
  NEW_PACKAGE_BOOKING_REQUEST,
  NEW_PACKAGE_BOOKING_SUCCESS,
  PACKAGE_DETAILS_FAIL,
  PACKAGE_DETAILS_REQUEST,
  PACKAGE_DETAILS_SUCCESS,
  DELETE_BOOKED_PACKAGE_REQUEST,
  DELETE_BOOKED_PACKAGE_SUCCESS,
  DELETE_BOOKED_PACKAGE_FAIL,
} from "../Constants/bookPackageConstants";

export const BookPackageReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PACKAGE_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PACKAGE_BOOKING_SUCCESS:
      return {
        loading: false,
        bookPkg: action.payload,
      };

    case NEW_PACKAGE_BOOKING_FAIL:
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

export const myPackagesReducer = (state = { packages: [] }, action) => {
  switch (action.type) {
    case MY_PACKAGE_REQUEST:
      return {
        loading: true,
      };

    case MY_PACKAGE_SUCCESS:
      return {
        loading: false,
        packages: action.payload,
      };

    case MY_PACKAGE_FAIL:
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

export const packageDetailsReducer = (state = { package: {} }, action) => {
  switch (action.type) {
    case PACKAGE_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case PACKAGE_DETAILS_SUCCESS:
      return {
        loading: false,
        package: action.payload,
      };

    case PACKAGE_DETAILS_FAIL:
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



export const deleteBookedPackageReducer = (
  state = { bookedPackage: {} },
  action
) => {
  switch (action.type) {
    case DELETE_BOOKED_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOKED_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedPackage: action.payload,
        isDeleted: action.payload,
      };

    case DELETE_BOOKED_PACKAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};