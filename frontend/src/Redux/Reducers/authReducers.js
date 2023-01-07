// import { authConstants } from "../actions/constants";

import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
} from "../Constants/authConstants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export const authReducer = (state = initState, action) => {
  // console.log(action);
  // eslint-disable-next-line default-case
  switch (action.type) {
    case LOGIN_REQUEST:
      case LOAD_USER_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case LOGIN_SUCCESS:
      case LOAD_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error:null,
        // success:action.payload.success,
      };
      break;
    case LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
      case LOAD_USER_FAIL:
        state = {
          loading: false,
          authenticate: false,
          user: null,
          error: action.payload.error,
        }
      break;
    case SIGNUP_REQUEST:
      break;
    case SIGNUP_SUCCESS:
      break;
    case SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
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
// export const allAdminsReducer = (state = { admins: [] }, action) => {
//   switch (action.type) {
//     case ALL_ADMIN_REQUEST:
//       return { loading: true, admins: [] };
//     case ALL_ADMIN_SUCCESS:
//       // console.log("acojaikjd",action.payload)
//       return { loading: false, admins: action.payload };
//     case ALL_ADMIN_FAIL:
//       return { loading: false, admins: action.payload };
//     default:
//       return state;
//   }
// };
