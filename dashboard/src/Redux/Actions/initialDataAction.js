import axios from "../helpers/axios";
import {
  GET_ALL_VACATION_CATEGORIES_SUCCESS
} from "../Constants/vacationCategoryConstants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      const { categories } = res.data;
      dispatch({
        type: GET_ALL_VACATION_CATEGORIES_SUCCESS,
        payload: { categories },
      });
    }
    console.log(res);
  };
};
