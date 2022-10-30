import { 
    GET_ALL_VACATION_CATEGORIES_REQUEST,
    GET_ALL_VACATION_CATEGORIES_SUCCESS,
    GET_ALL_VACATION_CATEGORIES_FAIL,

   } from "../Constants/vacationCategoryConstants";
import axios from "../helpers/axios";

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
  