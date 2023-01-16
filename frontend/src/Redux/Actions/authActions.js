import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../Constants/authConstants";
import axios from "../helpers/axios";
// new update signup action
export const signup = (user) => {
  return async (dispatch) => {
    let res;
    try {
      dispatch({ type: SIGNUP_REQUEST });
      res = await axios.post(`/signup`, user);
      if (res.status === 201) {
        dispatch({ type: SIGNUP_SUCCESS });
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
      }
      // else {
      //   // const { error } = res.data;
      //   // dispatch({ type: SIGNUP_FAILURE, payload: { error } });
      // }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: SIGNUP_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post(`/signin`, {
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

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
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

// Update Profile
export const updateProfile = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/me/update/${id}`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
