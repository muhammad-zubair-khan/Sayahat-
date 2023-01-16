import {
  GET_CAR_BY_SLUG_REQUEST,
  GET_CAR_BY_SLUG_SUCCESS,
  GET_CAR_BY_SLUG_FAIL,
  CREATE_NEW_CAR_REQUEST,
  CREATE_NEW_CAR_SUCCESS,
  CREATE_NEW_CAR_FAIL,
  GET_ALL_CARS_REQUEST,
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_FAIL,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAIL,
} from "../Constants/carConstants";
import axios from "../helpers/axios";

// Create New Car
export const addCar = (form) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_NEW_CAR_REQUEST });
    try {
      const res = await axios.post("/admin/car/add", form);
      // console.log("res......",res)
      if (res.status === 201) {
        dispatch({
          type: CREATE_NEW_CAR_SUCCESS,
          payload: res.data.car,
        });
      } else {
        dispatch({
          type: CREATE_NEW_CAR_FAIL,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

// Get All Cars For Admin
export const getAllCars = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CARS_REQUEST });

    const { data } = await axios.get("/admin/cars");

    dispatch({
      type: GET_ALL_CARS_SUCCESS,
      payload: data.cars,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CARS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Car by Slug
export const getCarBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_CAR_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/admin/car/${slug}`);
    console.log(data);
    dispatch({
      type: GET_CAR_BY_SLUG_SUCCESS,
      payload: data.car,
    });
  } catch (error) {
    dispatch({
      type: GET_CAR_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Car
export const deleteCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CAR_REQUEST });

    const { data } = await axios.post(`/admin/deletecar/${id}`);

    dispatch({
      type: DELETE_CAR_SUCCESS,
      payload: data.success,
    });
    dispatch({
      type: GET_ALL_CARS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CAR_FAIL,
      payload: error.response.data.message,
    });
  }
};
