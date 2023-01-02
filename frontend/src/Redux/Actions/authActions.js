import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  // ALL_USER_REQUEST,
  // ALL_USER_SUCCESS,
  // ALL_USER_FAIL,
} from "../Constants/authConstants";
import axios from "../helpers/axios";
import { setAlert } from "./alert";
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
    } 
    catch (error) {
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

// export const login = (email, password) => async (dispatch) => {
// 	const config = {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	};

// 	const body = JSON.stringify({ email, password });

// 	try {
// 		const res = await axios.post(
// 			"/signin",
// 			body,
// 			config
// 		);

// 		dispatch({
// 			type: LOGIN_SUCCESS,
// 			payload: res.data,
// 		});

// 		dispatch(isUserLoggedIn());
// 	} catch (err) {
// 		const errors = err.response.data.errors;

// 		if (errors) {
// 			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
// 		}

// 		dispatch({
// 			type: LOGIN_FAILURE,
// 		});
// 	}
// };


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