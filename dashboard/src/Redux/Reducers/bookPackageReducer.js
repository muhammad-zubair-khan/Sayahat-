import {
  CLEAR_ERRORS,
  ALL_BOOKED_PACKAGES_REQUEST,
  ALL_BOOKED_PACKAGES_SUCCESS,
  ALL_BOOKED_PACKAGES_FAIL,
  DELETE_BOOKED_PACKAGE_REQUEST,
  DELETE_BOOKED_PACKAGE_SUCCESS,
  DELETE_BOOKED_PACKAGE_FAIL,
} from "../Constants/bookPackageConstants";
export const allBookedPackagesReducer = (
  state = { bookedPackages: [] },
  action
) => {
  switch (action.type) {
    case ALL_BOOKED_PACKAGES_REQUEST:
      return {
        loading: true,
      };

    case ALL_BOOKED_PACKAGES_SUCCESS:
      return {
        loading: false,
        bookedPackages: action.payload,
      };

    case ALL_BOOKED_PACKAGES_FAIL:
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

// export const bookedCarDetailReducer = (state = { bookedCar: {} }, action) => {
//     switch (action.type) {
//         case GET_BOOKED_CAR_DETAIL_REQUEST:
//           return {
//             loading: true,
//             ...state
//           };
//         case GET_BOOKED_CAR_DETAIL_SUCCESS:
//           return {
//             loading: false,
//             bookedCar: action.payload,
//           };
//         case GET_BOOKED_CAR_DETAIL_FAIL:
//           return {
//             loading: false,
//             error: action.payload,
//           };
//       default:
//         return state;
//     }
//   };
