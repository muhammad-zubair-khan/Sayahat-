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
} from "../Constants/userConstants";
import axios from "../helpers/axios";

// export const login = (email,password) => async (dispatch) => {
//     try {
//         dispatch({type: USER_LOGIN_REQUEST});

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

//         const {data} = await axios.post(
//             '/api/user/login',
//             {email, password},
//             config
//         );
//         dispatch({type: USER_LOGIN_SUCCESS, payload:data});

//         localStorage.setItem("userInfo",JSON.stringify(data));
//     } catch (error) {
//         dispatch({
//             type: USER_LOGIN_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         });
//     }
// };

/// Get All USERS For Admin

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    const res = await axios.post(`/user/login`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
          console.log(user);
    } else {
      if (res.status === 400) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () =>{
  return async dispatch =>{
      const token  = localStorage.getItem('token');
      if(token){
          const user = JSON.parse(localStorage.getItem('user'));
          dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: {
                  token,user
              }
          })
      }
      else{
          dispatch({
              type: USER_LOGIN_FAIL, 
              payload:{error:'Failed to login'}
          })
      }
  }
}




export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USER_REQUEST });
  
      const response = await axios.get("/allUsers");
        console.log("all users>>>",response.data.users)
      dispatch({
        type: ALL_USER_SUCCESS,
        payload: response.data.users,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_FAIL,
        payload: error.response.data.message,
        
      });
      console.log(error.response);
    }
  };

  export const logout = () => {
    return async (dispatch) => {
      dispatch({ type: USER_LOGOUT_REQUEST });
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      localStorage.clear();
      dispatch({ type: USER_LOGOUT_SUCCESS });
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
  
// export const logout = () => (dispatch) => {
//     localStorage.removeItem("userInfo");
//     dispatch({type: USER_LOGOUT});
// };