import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
} from '../Constants/UserConstants'


const initialState = {
    token: null,
    user: {
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
// export const userLoginReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case USER_LOGIN_REQUEST:
//             // state = {
//             //     ...state,
//             //     authenticating: true,
//             //   };
//             //   break;
//             return {loading:true};
//         //    break;
//         case USER_LOGIN_SUCCESS:
//             return {loading:false, userInfo: action.payload};
//         //    break;
//         case USER_LOGIN_FAIL:
//             return {loading:false, error: action.payload};
//         //    break;
//         case USER_LOGOUT:
//             return {};
//         case ALL_USER_REQUEST:
//             return {loading:true};
//         case ALL_USER_SUCCESS:
//             return {loading:false, userInfo: action.payload}
//         default:
//             return state;
//     }
// };

export const authReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        state = {
          ...state,
          authenticating: true,
        };
        break;
      case USER_LOGIN_SUCCESS:
        state = {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          authenticate: true,
          authenticating: false,
        };
        break;
      case USER_LOGIN_FAIL:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
        break;
      case USER_LOGOUT_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case USER_LOGOUT_SUCCESS:
        state = {
          ...initialState,
        };
        break;
      case USER_LOGOUT_FAIL:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
        break;
    }
  
    return state;
  }; 
  
export const allUsersReducer = (state = { users: [] }, action) => {
    switch(action.type) {
        case ALL_USER_REQUEST:
            return {loading: true,
            users: [],}
        case ALL_USER_SUCCESS:
            // console.log("acojaikjd",action.payload)
            return {loading:false, users: action.payload}
            case ALL_USER_FAIL:
                return {loading:false, error: action.payload}
                default:
                    return state;
                }
            };