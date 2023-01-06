import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./Reducers/authReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import { vacationProductReducer,addCitiesReducer } from "./Reducers/VacationProductReducer";
import { allHotelsReducer, hotelsReducer, newReviewReducer, hotelReviewsReducer, reviewReducer, featuredHotelReducer, hotelReducer } from "./Reducers/hotelReducer";
import { allCarsReducer, carReviewsReducer, newCarReducer, newReviewCarReducer, reviewCarReducer } from "./Reducers/carReducer";
import { allPackagesReducer, featuredPackagesReducer, newPackageReducer, newReviewPackageReducer, packageReviewsReducer, reviewPackageReducer } from "./Reducers/packageReducer";
import { contactCheckoutReducer, hotelContactCheckoutReducer } from "./Reducers/checkoutReducer";
import { BookPackageReducer, myPackagesReducer, packageDetailsReducer } from "./Reducers/bookPackageReducer";
import { hotelDetailsReducer, myHotelsReducer } from "./Reducers/bookHotelReducer";
// import { addNewDestinationReducer, destinationReducer } from "./Reducers/topDestinatonsReducer";

const reducer = combineReducers({
  auth: authReducer,
  Vacationcategory: VacationCategoryReducer,
  vacationProduct: vacationProductReducer,
  newVacation: addCitiesReducer,
  hotelReducer: allHotelsReducer,
  hotelById:hotelReducer,
  delhotelReducer: hotelsReducer,
  addCarReducer: newCarReducer,
  carsReducer: allCarsReducer,
  addPackageReducer: newPackageReducer,
  packagesReducer: allPackagesReducer,
  // allDestinationReducer: destinationReducer,
  // newDestination: addNewDestinationReducer,
  newReview: newReviewReducer,
  hotelReviews: hotelReviewsReducer,
  review: reviewReducer,
  newPackageReview:newReviewPackageReducer,
  packageReview:packageReviewsReducer,
  delPackageReview:reviewPackageReducer,
  newCarReview:newReviewCarReducer,
  carReview:carReviewsReducer,
  delCarReview:reviewCarReducer,
  featureHotels:featuredHotelReducer,
  featurePackages:featuredPackagesReducer,
  contactCheckout:contactCheckoutReducer,
  bookPkg:BookPackageReducer,
  myPackages:myPackagesReducer,
  myPackageDetails:packageDetailsReducer,
  hotelContactCheckout:hotelContactCheckoutReducer,
  myHotels:myHotelsReducer,
  myHotelDetails:hotelDetailsReducer,


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
