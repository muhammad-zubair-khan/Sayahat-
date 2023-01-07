import {
    SAVE_CONTACT_INFO,
    SAVE_HOTEL_CONTACT_INFO,
    SAVE_CAR_CONTACT_INFO,
} from "../Constants/checkoutConstants";

export const contactCheckoutReducer = (
    state = { contactInfo: {} },
    action
  ) => {
    switch (action.type) {

      case SAVE_CONTACT_INFO:
        return {
          ...state,
          contactInfo: action.payload,
        };
  
      default:
        return state;
    }
  };

export const hotelContactCheckoutReducer = (
    state = { hotelContactInfo: {} },
    action
  ) => {
    switch (action.type) {

      case SAVE_HOTEL_CONTACT_INFO:
        return {
          ...state,
          hotelContactInfo: action.payload,
        };
  
      default:
        return state;
    }
  };

export const carContactCheckoutReducer = (
    state = { CarContactInfo: {} },
    action
  ) => {
    switch (action.type) {

      case SAVE_CAR_CONTACT_INFO:
        return {
          ...state,
          CarContactInfo: action.payload,
        };
  
      default:
        return state;
    }
  };


