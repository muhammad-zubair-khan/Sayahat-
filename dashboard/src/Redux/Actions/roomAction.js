import axios from "../helpers/axios";
import {
  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_SUCCESS,
  GET_ALL_ROOMS_FAIL,
} from "../Constants/roomConstants";

// Get All Rooms For Admin
export const getAllRooms = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ROOMS_REQUEST });

    const { data } = await axios.get("/admin/rooms/all-rooms");
    dispatch({
      type: GET_ALL_ROOMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ROOMS_FAIL,
      payload: error.response.data.message,
    });
  }
};
