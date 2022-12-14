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
import axios from "../helpers/axios";

// export const login = (email,password) => async (dispatch) => {
//     try {
//         dispatch({type: ADMIN_LOGIN_REQUEST});

//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         };

//         const {data} = await axios.post(
//             '/api/admin/login',
//             {email, password},
//             config
//         );
//         dispatch({type: ADMIN_LOGIN_SUCCESS, payload:data});

//         localStorage.setItem("adminInfo",JSON.stringify(data));
//     } catch (error) {
//         dispatch({
//             type: ADMIN_LOGIN_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         });
//     }
// };

/// Get All ADMINS For Admin

export const login = (admin) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const res = await axios.post(`/admin/login`, {
      ...admin,
    });

    if (res.status === 200) {
      const { token, admin } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: {
          token,
          admin,
        },
      });
          console.log(admin);
    } else {
      if (res.status === 400) {
        dispatch({
          type: ADMIN_LOGIN_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isAdminLoggedIn = () =>{
  return async dispatch =>{
      const token  = localStorage.getItem('token');
      if(token){
          const admin = JSON.parse(localStorage.getItem('admin'));
          dispatch({
              type: ADMIN_LOGIN_SUCCESS,
              payload: {
                  token,admin
              }
          })
      }
      else{
          dispatch({
              type: ADMIN_LOGIN_FAIL, 
              payload:{error:'Failed to login'}
          })
      }
  }
}




export const getAllAdmins = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ADMIN_REQUEST });
  
      const response = await axios.get("/allAdmins");
        console.log("all admins>>>",response.data.admins)
      dispatch({
        type: ALL_ADMIN_SUCCESS,
        payload: response.data.admins,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADMIN_FAIL,
        payload: error.response.data.message,
        
      });
      console.log(error.response);
    }
  };

  export const logout = () => {
    return async (dispatch) => {
      dispatch({ type: ADMIN_LOGOUT_REQUEST });
      // localStorage.removeItem('admin');
      // localStorage.removeItem('token');
      localStorage.clear();
      dispatch({ type: ADMIN_LOGOUT_SUCCESS });
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
//     localStorage.removeItem("adminInfo");
//     dispatch({type: ADMIN_LOGOUT});
// };