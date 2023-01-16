import {
  ALL_ADMIN_REQUEST,
  ALL_ADMIN_SUCCESS,
  ALL_ADMIN_FAIL,
} from "../Constants/adminConstants";

import {
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
} from "../Constants/adminConstants";

const initState = {
  error: null,
  message: "",
  loading: false,
};

export const registerAdminReducer = (state = initState, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADMIN_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case ADMIN_REGISTER_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
        return state
  }
};
export const allAdminsReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ALL_ADMIN_REQUEST:
      return { loading: true, admins: [] };
    case ALL_ADMIN_SUCCESS:
      return { loading: false, admins: action.payload };
    case ALL_ADMIN_FAIL:
      return { loading: false, admins: action.payload };
    default:
      return state;
  }
};
