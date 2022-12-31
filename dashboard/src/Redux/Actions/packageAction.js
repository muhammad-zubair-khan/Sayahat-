import {
    GET_PACKAGE_BY_SLUG_REQUEST,
    GET_PACKAGE_BY_SLUG_SUCCESS,
    GET_PACKAGE_BY_SLUG_FAIL,
    CREATE_NEW_PACKAGE_REQUEST,
    CREATE_NEW_PACKAGE_SUCCESS,
    CREATE_NEW_PACKAGE_FAIL,
    CREATE_NEW_PACKAGE_RESET,
    GET_ALL_PACKAGES_REQUEST,
    GET_ALL_PACKAGES_SUCCESS,
    GET_ALL_PACKAGES_FAIL,
    DELETE_PACKAGE_REQUEST,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_FAIL,
    GET_TOP_DES_PACKAGE_BY_SLUG_REQUEST,
    GET_TOP_DES_PACKAGE_BY_SLUG_SUCCESS,
    GET_TOP_DES_PACKAGE_BY_SLUG_FAIL,
  } from "../Constants/packageConstants";
  import axios from "../helpers/axios";

// Create New Pacakge
export const createPackage = (form) => {
  return async dispatch => {
    dispatch({ type:  CREATE_NEW_PACKAGE_REQUEST });
    try {
      const res = await axios.post("/admin/package/create", form);
      console.log("res......",res)
      if (res.status === 201) {
        dispatch({
          type: CREATE_NEW_PACKAGE_SUCCESS,
          payload: res.data.package,
        });
      } else {
        dispatch({
          type: CREATE_NEW_PACKAGE_FAIL,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.message);
    //   if(e instance of BSONTypeError){
    //  }
    }

  };
};

// Get All Packages For Admin
export const getAllPackages = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PACKAGES_REQUEST });

    const { data } = await axios.get("/admin/all-packages");

    dispatch({
      type: GET_ALL_PACKAGES_SUCCESS,
      payload: data.packages,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PACKAGES_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Package by Slug
export const getPackageBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/admin/package/${slug}`);
    console.log(data);
    dispatch({
      type: GET_PACKAGE_BY_SLUG_SUCCESS,
      payload: data.packages,
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Top Des Package by Slug
export const getTopDesPackageBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_DES_PACKAGE_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/top-des-package/${slug}`);
    console.log(data);
    dispatch({
      type: GET_TOP_DES_PACKAGE_BY_SLUG_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: GET_TOP_DES_PACKAGE_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

 // Delete Package
 export const deletePackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PACKAGE_REQUEST });

    const { data } = await axios.post(`/admin/deletepackage/${id}`);

    dispatch({
      type: DELETE_PACKAGE_SUCCESS,
      payload: data.success,
    });
    dispatch({
      type: GET_ALL_PACKAGES_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
