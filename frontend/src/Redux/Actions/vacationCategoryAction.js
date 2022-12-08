import {
  GET_ALL_VACATION_CATEGORIES_REQUEST,
  GET_ALL_VACATION_CATEGORIES_SUCCESS,
  GET_ALL_VACATION_CATEGORIES_FAIL,
  CREATE_NEW_CATEGORY_REQUEST,
  CREATE_NEW_CATEGORY_SUCCESS,
  CREATE_NEW_CATEGORY_FAIL,
  DELETE_VACATION_CATEGORY_REQUEST,
  DELETE_VACATION_CATEGORY_SUCCESS,
  DELETE_VACATION_CATEGORY_FAIL,
  UPDATE_VACATION_CATEGORY_REQUEST,
  UPDATE_VACATION_CATEGORY_SUCCESS,
  UPDATE_VACATION_CATEGORY_FAIL,
} from "../Constants/vacationCategoryConstants";
import axios from "../helpers/axios";

export const createVacationCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post("/vacation/category/add", form);
      if (res.status === 201) {
        dispatch(getAllVacationsCategory());
        dispatch({
          type: CREATE_NEW_CATEGORY_SUCCESS,
          payload: { Vacationcategory: res.data.category },
        });
      } else {
        dispatch({
          type: CREATE_NEW_CATEGORY_FAIL,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const getAllVacationsCategory = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_VACATION_CATEGORIES_REQUEST });
    const res = await axios.get(`/vacations/getcategories`);
    // console.log(res);
    if (res.status === 200) {
      const { vacationCategoryList } = res.data;

      dispatch({
        type: GET_ALL_VACATION_CATEGORIES_SUCCESS,
        payload: { categories: vacationCategoryList },
      });
    } else {
      dispatch({
        type: GET_ALL_VACATION_CATEGORIES_FAIL,
        payload: { error: res.data.error },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_VACATION_CATEGORY_REQUEST });
    const res = await axios.post(`/vacation/category/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status === 201) {
      dispatch(getAllVacationsCategory());
      dispatch({ type: DELETE_VACATION_CATEGORY_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: DELETE_VACATION_CATEGORY_FAIL,
        payload: { error },
      });
    }
  };
};

export const updateVacationCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_VACATION_CATEGORY_REQUEST });
    const res = await axios.post(`/vacation/category/update`, form);
    if (res.status === 201) {
      dispatch({ type: UPDATE_VACATION_CATEGORY_SUCCESS });
      dispatch(getAllVacationsCategory());
    } else {
      const { error } = res.data;
      dispatch({
        type: UPDATE_VACATION_CATEGORY_FAIL,
        payload: { error },
      });
    }
  };
};
