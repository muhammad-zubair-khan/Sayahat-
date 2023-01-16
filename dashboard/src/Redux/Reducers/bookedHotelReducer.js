import {
  CLEAR_ERRORS,
  ALL_BOOKED_HOTELS_REQUEST,
  ALL_BOOKED_HOTELS_SUCCESS,
  ALL_BOOKED_HOTELS_FAIL,
  DELETE_BOOKED_HOTEL_REQUEST,
  DELETE_BOOKED_HOTEL_SUCCESS,
  DELETE_BOOKED_HOTEL_FAIL,
} from "../Constants/bookHotelConstants";
export const allBookedHotelsReducer = (
  state = { bookedHotels: [] },
  action
) => {
  switch (action.type) {
    case ALL_BOOKED_HOTELS_REQUEST:
      return {
        loading: true,
      };

    case ALL_BOOKED_HOTELS_SUCCESS:
      return {
        loading: false,
        bookedHotels: action.payload,
      };

    case ALL_BOOKED_HOTELS_FAIL:
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

export const deleteBookedHotelReducer = (
  state = { bookedHotle: {} },
  action
) => {
  switch (action.type) {
    case DELETE_BOOKED_HOTEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOKED_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedHotel: action.payload,
        isDeleted: action.payload,
      };

    case DELETE_BOOKED_HOTEL_FAIL:
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
