import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
   } from "../constants/authConstants";
  import axios from "../helpers/axios";
  
  
  
  export const login = (user) => {
    return async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      const res = await axios.post(`/login`, {
        ...user,
      });
  
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: LOGIN_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    };
  };
  
  export const isUserLoggedIn = () => {
    return async (dispatch) => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: { error: "Failed to login" },
        });
      }
    };
  };
  
  export const signout = () => {
    return async (dispatch) => {
      dispatch({ type: LOGOUT_REQUEST });
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      localStorage.clear();
      dispatch({ type: LOGOUT_SUCCESS });
      //const res = await axios.post(`/admin/signout`);
      // if(res.status === 200){
  
      // }else{
      //     dispatch({
      //         type: authConstants.LOGOUT_FAILURE,
      //         payload: { error: res.data.error }
      //     });
      // }
    };
  };
  