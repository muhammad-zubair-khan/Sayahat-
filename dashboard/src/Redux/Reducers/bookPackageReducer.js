import { CLEAR_ERRORS,ALL_BOOKED_PACKAGES_REQUEST,ALL_BOOKED_PACKAGES_SUCCESS,ALL_BOOKED_PACKAGES_FAIL, GET_BOOKED_PACKAGE_DETAIL_REQUEST, GET_BOOKED_PACKAGE_DETAIL_SUCCESS, GET_BOOKED_PACKAGE_DETAIL_FAIL } from "../Constants/bookPackageConstants";
export const allBookedPackagesReducer = (state = { bookedPackages: [] }, action) => {
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