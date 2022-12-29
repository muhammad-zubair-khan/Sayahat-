// import { authConstants, userContants } from "./constants";
import axios from "../helpers/axios";
import {  ADMIN_REGISTER_FAIL, ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ALL_ADMIN_FAIL, ALL_ADMIN_REQUEST, ALL_ADMIN_SUCCESS } from "../Constants/adminConstants";

export const signup = (user) => {
    console.log(user)
    return async (dispatch) => {
        dispatch({ type: ADMIN_REGISTER_REQUEST });
        const res = await axios.post(`/admin/signup`, {
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: ADMIN_REGISTER_SUCCESS,
                payload: {message}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: ADMIN_REGISTER_FAIL,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const getAllAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_REQUEST });

    const response = await axios.get("/allAdmins");
      console.log("all admins>>>",response.data.user)
    dispatch({
      type: ALL_ADMIN_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_FAIL,
      payload: error.response.data.message,
      
    });
    console.log(error.response);
  }
};
