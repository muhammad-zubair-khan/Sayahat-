import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
  } from "../constants/authConstants";
  
  const initialState = {
    token: null,
    user: {
      firstName: "",
      lastName: "",
      email: "",
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: "",
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export const authReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
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
      case LOGIN_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
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
          ...initialState,
        };
        break;
      case LOGOUT_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          loading: false,
        };
        break;
    }
  
    return state;
  };
  