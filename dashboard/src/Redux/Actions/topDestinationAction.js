import axios from "../helpers/axios";

import {
  GET_ALL_DESTINATIONS_REQUEST,
  GET_ALL_DESTINATIONS_SUCCESS,
  GET_ALL_DESTINATIONS_FAIL,
  GET_DESTINATION_BY_SLUG_REQUEST,
  GET_DESTINATION_BY_SLUG_SUCCESS,
  GET_DESTINATION_BY_SLUG_FAIL,
  NEW_DESTINATION_REQUEST,
  NEW_DESTINATION_SUCCESS,
  NEW_DESTINATION_FAIL,
  NEW_DESTINATION_RESET,
} from "../Constants/topDestionationsConstant";

// Create Product
// export const createProduct = (form) => async(dispatch) => {
//   try {
//     dispatch({ type: NEW_VACATION_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.post(
//       `/admin/VacationProduct/new`,
//       form,
//       config
//       );
//       // console.log("data>>>>",myForm)

//     dispatch({
//       type: NEW_VACATION_PRODUCT_SUCCESS,
//       payload: data.product,
//     });
//     console.log(data)
//   } catch (error) {
//     dispatch({
//       type: NEW_VACATION_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const createDestination = (form) => {
  return async (dispatch) => {
    dispatch({ type: NEW_DESTINATION_REQUEST });
    try {
      const res = await axios.post("/admin/destination/new", form);
      if (res.status === 201) {
        dispatch({
          type: NEW_DESTINATION_SUCCESS,
          payload: res.data.destionation,
        });
      } else {
        dispatch({
          type: NEW_DESTINATION_FAIL,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

// Get All Destinations For Admin
export const getAllDestinations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_DESTINATIONS_REQUEST });

    const { data } = await axios.get("/view-all-destinations");

    dispatch({
      type: GET_ALL_DESTINATIONS_SUCCESS,
      payload: data.destinations,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_DESTINATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get Destination by Slug
export const getDestinationBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_DESTINATION_BY_SLUG_REQUEST });
    const { data } = await axios.get(`/destinations/${slug}`);
    console.log(data);
    dispatch({
      type: GET_DESTINATION_BY_SLUG_SUCCESS,
      payload: data.destination,
    });
  } catch (error) {
    dispatch({
      type: GET_DESTINATION_BY_SLUG_FAIL,
      payload: error.response.data.message,
    });
  }
};
