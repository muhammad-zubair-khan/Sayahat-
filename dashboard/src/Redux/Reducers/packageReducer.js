import {
  GET_PACKAGE_BY_SLUG_REQUEST,
  GET_PACKAGE_BY_SLUG_SUCCESS,
  GET_PACKAGE_BY_SLUG_FAIL,
  CREATE_NEW_PACKAGE_REQUEST,
  CREATE_NEW_PACKAGE_SUCCESS,
  CREATE_NEW_PACKAGE_FAIL,
  CREATE_NEW_PACKAGE_RESET,
  GET_ALL_PACKAGES_REQUEST,
  GET_ALL_PACKAGES_SUCCESS,
  GET_ALL_PACKAGES_FAIL,
  DELETE_PACKAGE_REQUEST,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAIL,
  DELETE_PACKAGE_RESET,
  GET_TOP_DES_PACKAGE_BY_SLUG_REQUEST,
  GET_TOP_DES_PACKAGE_BY_SLUG_SUCCESS,
  GET_TOP_DES_PACKAGE_BY_SLUG_FAIL,
} from "../Constants/packageConstants";

const initialStatePackage = {
  package: {},
  loading: false,
};

export const newPackageReducer = (state = initialStatePackage, action) => {
  switch (action.type) {
    case CREATE_NEW_PACKAGE_REQUEST:
      return {
        // ...state,
        package: {},
        loading: false,
      };
    case CREATE_NEW_PACKAGE_SUCCESS:
      return {
        loading: true,
        success: true,
        package: action.payload,
      };
    case CREATE_NEW_PACKAGE_FAIL:
      return {
        // ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case CREATE_NEW_PACKAGE_RESET:
      return {
        package: {},
        success: false,
      };

    default:
      return state;
  }
};

export const allPackagesReducer = (state = { packages: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PACKAGES_REQUEST:
      return {
        loading: true,
        packages: [],
      };
    case GET_ALL_PACKAGES_SUCCESS:
      return {
        loading: false,
        packages: action.payload,
      };
    case GET_ALL_PACKAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_PACKAGE_BY_SLUG_REQUEST:
      return {
        loading: true,
        packages: [],
      };
    case GET_PACKAGE_BY_SLUG_SUCCESS:
      return {
        loading: false,
        packages: [...action.payload],
      };
    case GET_PACKAGE_BY_SLUG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_TOP_DES_PACKAGE_BY_SLUG_REQUEST:
      return {
        loading: true,
        packages: [],
      };
    case GET_TOP_DES_PACKAGE_BY_SLUG_SUCCESS:
      return {
        loading: false,
        packages: [...action.payload],
      };
    case GET_TOP_DES_PACKAGE_BY_SLUG_FAIL:
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

export const packagesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PACKAGE_REQUEST:
      // case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PACKAGE_SUCCESS:
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
    case DELETE_PACKAGE_FAIL:
      // case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PACKAGE_RESET:
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
