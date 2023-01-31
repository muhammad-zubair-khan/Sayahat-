import {
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  ADD_TO_FAVORITES_FAILURE,
  REMOVE_FROM_FAVORITES,
  GET_ALL_FAVORITE_REQUEST,
  GET_ALL_FAVORITE_SUCCESS,
  GET_ALL_FAVORITE_FAIL,
} from "../Actions/favourtieAction";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

export const addToFav = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        loading: false,
      };
    case ADD_TO_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    case GET_ALL_FAVORITE_REQUEST:
      return {
        loading: true,
        favorites: [],
      };
    case GET_ALL_FAVORITE_SUCCESS:
      return {
        loading: false,
        favorites: action.payload.favorites,
      };
    case GET_ALL_FAVORITE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
