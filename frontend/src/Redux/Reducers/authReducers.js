// import { authConstants } from "../actions/constants";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../Constants/authConstants";

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
  console.log(action);

  switch (action.type) {
    case LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
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
