import {
    GET_PACKAGE_BY_SLUG_REQUEST,
    GET_PACKAGE_BY_SLUG_SUCCESS,
    GET_PACKAGE_BY_SLUG_FAIL,
    GET_PACKAGE_DETAIL_BY_ID_REQUEST,
    GET_PACKAGE_DETAIL_BY_ID_SUCCESS,
    GET_PACKAGE_DETAIL_BY_ID_FAIL,
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
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
  } from "../Constants/packageConstants";
  import axios from "../helpers/axios";

// Create New Pacakge
export const createPackage = (form) => {
  return async dispatch => {
    dispatch({ type:  CREATE_NEW_PACKAGE_REQUEST });
    try {
      const res = await axios.post("/package/create", form);
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

    const { data } = await axios.get("/all-packages");

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
    const { data } = await axios.get(`/package/${slug}`);
    console.log(data);
    dispatch({
      type: GET_PACKAGE_BY_SLUG_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Package detail By Id
export const getPackageDetailById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_DETAIL_BY_ID_REQUEST });
    const { data } = await axios.get(`/package-detail/${id}`);
    console.log(data);
    dispatch({
      type: GET_PACKAGE_DETAIL_BY_ID_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_DETAIL_BY_ID_FAIL,
      payload: error.response
    });
  }
};
 // Delete Package
 export const deletePackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PACKAGE_REQUEST });

    const { data } = await axios.post(`/deletepackage/${id}`);

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


// NEW REVIEW
export const newPackageReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/create/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Packae
export const getAllPackageReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Package
export const deletePackageReviews = (reviewId, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/reviews?id=${reviewId}&PackageId=${id}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};