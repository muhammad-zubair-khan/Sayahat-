import {
    SAVE_CONTACT_INFO,
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