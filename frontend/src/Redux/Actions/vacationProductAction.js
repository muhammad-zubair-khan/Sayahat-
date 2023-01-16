import axios from "../helpers/axios";

import {
  GET_ALL_VACATION_PRODUCTS_REQUEST,
  GET_ALL_VACATION_PRODUCTS_SUCCESS,
  GET_ALL_VACATION_PRODUCTS_FAIL,
  GET_VACATION_PRODUCTS_BY_SLUG_REQUEST,
  GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS,
  GET_VACATION_PRODUCTS_BY_SLUG_FAIL,
  NEW_VACATION_PRODUCT_REQUEST,
  NEW_VACATION_PRODUCT_SUCCESS,
  NEW_VACATION_PRODUCT_FAIL,
  GET_PRODUCT_DETAIL_BY_ID_REQUEST,
  GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
  GET_PRODUCT_DETAIL_BY_ID_FAIL,
} from "../Constants/vacationProductConstants";

export const createProduct = (form) => {
  return async (dispatch) => {
    dispatch({ type: NEW_VACATION_PRODUCT_REQUEST });
    try {
      const res = await axios.post("/admin/VacationProduct/new", form);
      // if (res.status === 201) {
      dispatch({
        type: NEW_VACATION_PRODUCT_SUCCESS,
        payload: res.data.product,
      });
      // } else {
      // }
    } catch (error) {
      dispatch({
        type: NEW_VACATION_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
      // console.log(error.response);
    }
  };
};

// Get All Products For Admin
export const getAllVacationProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_VACATION_PRODUCTS_REQUEST });

    const { data } = await axios.get("/view-all-vacations");

    dispatch({
      type: GET_ALL_VACATION_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_VACATION_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Product by Slug
export const getVacationProductsBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_VACATION_PRODUCTS_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/vacations/${slug}`);
    // console.log(data);
    dispatch({
      type: GET_VACATION_PRODUCTS_BY_SLUG_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_VACATION_PRODUCTS_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get product detail By Id
export const getProductDetailById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAIL_BY_ID_REQUEST });
    const { data } = await axios.get(`/vacation-detail/${id}`);
    console.log(data);
    dispatch({
      type: GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAIL_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};
