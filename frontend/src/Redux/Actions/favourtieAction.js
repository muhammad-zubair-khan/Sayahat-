import axios from 'axios';

export const ADD_TO_FAVORITES_REQUEST = 'ADD_TO_FAVORITES_REQUEST';
export const ADD_TO_FAVORITES_SUCCESS = 'ADD_TO_FAVORITES_SUCCESS';
export const ADD_TO_FAVORITES_FAILURE = 'ADD_TO_FAVORITES_FAILURE';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const GET_ALL_FAVORITE_REQUEST = 'GET_ALL_FAVORITE_REQUEST';
export const GET_ALL_FAVORITE_SUCCESS = 'GET_ALL_FAVORITE_SUCCESS';
export const GET_ALL_FAVORITE_FAIL = 'GET_ALL_FAVORITE_FAIL';


// export const addToFavorites = (PackageId) => {
//     return async (dispatch) => {
//       dispatch({ type: ADD_TO_FAVORITES_REQUEST });
//       try {
//         const response = await axios.post(`http://localhost:5000/api/save/favourite`);
//         dispatch({
//           type: ADD_TO_FAVORITES_SUCCESS,
//           payload: response.data,
//         });
//       } catch (error) {
//         dispatch({
//           type: ADD_TO_FAVORITES_FAILURE,
//           error,
//         });
//       }
//     };
//   };

// Get All Favorite
export const getFavorite = () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_FAVORITE_REQUEST });
      const { data } = await axios.get(`http://localhost:5000/api/favorites`);
      dispatch({
        type: GET_ALL_FAVORITE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_FAVORITE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const removeFromFavorites = (itemId) => async (dispatch) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${itemId}`);
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: itemId,
      });
    } catch (error) {
      console.error(error.message);
    }
  };