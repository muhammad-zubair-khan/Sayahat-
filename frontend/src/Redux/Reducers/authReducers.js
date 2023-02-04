import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
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
  loading: true,
  error: null,
  message: "",
};

export const authReducer = (state = initState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
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
        loading:false
        // success:action.payload.success,
      };
      break;
    case LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading:false,
        authenticate: false,
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
        error: action.payload,
      };
      break;
  }

  return state;
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    // case UPDATE_PASSWORD_REQUEST:
    // case UPDATE_USER_REQUEST:
    // case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    // case UPDATE_PASSWORD_SUCCESS:
    // case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isDeleted: action.payload.success,
    //     message: action.payload.message,
    //   };

    case UPDATE_PROFILE_FAIL:
    // case UPDATE_PASSWORD_FAIL:
    // case UPDATE_USER_FAIL:
    // case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    // case UPDATE_PASSWORD_RESET:
    // case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    // case DELETE_USER_RESET:
    //   return {
    //     ...state,
    //     isDeleted: false,
    //   };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
