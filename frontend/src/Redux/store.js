import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, profileReducer } from "./Reducers/authReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import {
  vacationProductReducer,
  addCitiesReducer,
} from "./Reducers/VacationProductReducer";
import {
  allHotelsReducer,
  hotelsReducer,
  newReviewReducer,
  hotelReviewsReducer,
  reviewReducer,
  featuredHotelReducer,
  hotelReducer,
} from "./Reducers/hotelReducer";
import {
  allCarsReducer,
  carReviewsReducer,
  newCarReducer,
  newReviewCarReducer,
  reviewCarReducer,
} from "./Reducers/carReducer";
import {
  allPackagesReducer,
  featuredPackagesReducer,
  newPackageReducer,
  newReviewPackageReducer,
  packageReviewsReducer,
  reviewPackageReducer,
} from "./Reducers/packageReducer";
import {
  carContactCheckoutReducer,
  contactCheckoutReducer,
  hotelContactCheckoutReducer,
} from "./Reducers/checkoutReducer";
import {
  BookPackageReducer,
  deleteBookedPackageReducer,
  myPackagesReducer,
  packageDetailsReducer,
} from "./Reducers/bookPackageReducer";
import {
  deleteBookedHotelReducer,
  hotelDetailsReducer,
  myHotelsReducer,
} from "./Reducers/bookHotelReducer";
import { carDetailsReducer, myCarsReducer } from "./Reducers/bookCarReducer";
import { addToFav } from "./Reducers/favourtieReducer";

const reducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  Vacationcategory: VacationCategoryReducer,
  vacationProduct: vacationProductReducer,
  newVacation: addCitiesReducer,
  hotelReducer: allHotelsReducer,
  hotelById: hotelReducer,
  delhotelReducer: hotelsReducer,
  addCarReducer: newCarReducer,
  carsReducer: allCarsReducer,
  addPackageReducer: newPackageReducer,
  packagesReducer: allPackagesReducer,
  newReview: newReviewReducer,
  hotelReviews: hotelReviewsReducer,
  review: reviewReducer,
  newPackageReview: newReviewPackageReducer,
  packageReview: packageReviewsReducer,
  delPackageReview: reviewPackageReducer,
  newCarReview: newReviewCarReducer,
  carReview: carReviewsReducer,
  delCarReview: reviewCarReducer,
  featureHotels: featuredHotelReducer,
  featurePackages: featuredPackagesReducer,
  contactCheckout: contactCheckoutReducer,
  bookPkg: BookPackageReducer,
  delBookedPackageReducer: deleteBookedPackageReducer,
  delBookedHotelReducer: deleteBookedHotelReducer,
  myPackages: myPackagesReducer,
  myPackageDetails: packageDetailsReducer,
  hotelContactCheckout: hotelContactCheckoutReducer,
  myHotels: myHotelsReducer,
  myHotelDetails: hotelDetailsReducer,
  carContactCheckout: carContactCheckoutReducer,
  myCars: myCarsReducer,
  myCarDetails: carDetailsReducer,
  addTofavorite:addToFav,
});
//Login

// const userInfoFormLocalStorage = localStorage.getItem("userInfo")
// ? JSON.parse(localStorage.getItem("userInfo"))
// : null;

// const initialState = {
//     userLogin : {userInfo: userInfoFormLocalStorage}
// }
let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
