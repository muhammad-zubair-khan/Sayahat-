import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  ALL_ADMIN_REQUEST,
  ALL_ADMIN_SUCCESS,
  ALL_ADMIN_FAIL,
} from "../Constants/adminConstants";

const initialState = {
  token: null,
  admin: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};
// export const ADMINLoginReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case ADMIN_LOGIN_REQUEST:
//             // state = {
//             //     ...state,
//             //     authenticating: true,
//             //   };
//             //   break;
//             return {loading:true};
//         //    break;
//         case ADMIN_LOGIN_SUCCESS:
//             return {loading:false, ADMINInfo: action.payload};
//         //    break;
//         case ADMIN_LOGIN_FAIL:
//             return {loading:false, error: action.payload};
//         //    break;
//         case ADMIN_LOGOUT:
//             return {};
//         case ALL_ADMIN_REQUEST:
//             return {loading:true};
//         case ALL_ADMIN_SUCCESS:
//             return {loading:false, adminInfo: action.payload}
//         default:
//             return state;
//     }
// };

export const authReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case ADMIN_LOGIN_SUCCESS:
      state = {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case ADMIN_LOGIN_FAIL:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case ADMIN_LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ADMIN_LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;
    case ADMIN_LOGOUT_FAIL:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};

export const allAdminsReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ALL_ADMIN_REQUEST:
      return { loading: true, admins: [] };
    case ALL_ADMIN_SUCCESS:
      // console.log("acojaikjd",action.payload)
      return { loading: false, admins: action.payload };
    case ALL_ADMIN_FAIL:
      return { loading: false, admins: action.payload };
    default:
      return state;
  }
};
