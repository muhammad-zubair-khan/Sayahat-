import {
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_FAIL,
} from "../Constants/roomConstants";

const initialStateRoom = {
  room: {},
  loading: false,
};

export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case GET_ALL_ROOMS_REQUEST:
      return {
        loading: true,
        rooms: [],
      };
    case GET_ALL_ROOMS_SUCCESS:
      return {
        loading: false,
        rooms: action.payload,
      };
    case GET_ALL_ROOMS_FAIL:
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
