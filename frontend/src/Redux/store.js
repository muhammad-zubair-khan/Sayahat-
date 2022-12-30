import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, allAdminsReducer } from "./Reducers/authReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import { vacationProductReducer,addCitiesReducer,allCitiesReducer } from "./Reducers/VacationProductReducer";
import { allHotelsReducer, hotelsReducer, newReviewReducer, hotelReviewsReducer, reviewReducer } from "./Reducers/hotelReducer";
import { allCarsReducer, carReviewsReducer, newCarReducer, newReviewCarReducer, reviewCarReducer } from "./Reducers/carReducer";
import { allPackagesReducer, newPackageReducer, newReviewPackageReducer, packageReviewsReducer, reviewPackageReducer } from "./Reducers/packageReducer";
import { allUsersReducer, userAuthReducer } from "./Reducers/userReducers";
import { addNewDestinationReducer, destinationReducer } from "./Reducers/topDestinatonsReducer";

const reducer = combineReducers({
  auth: authReducer,
  // allAdmins: allAdminsReducer,
  // userAuth: userAuthReducer,
  // allUsers: allUsersReducer,
  Vacationcategory: VacationCategoryReducer,
  vacationProduct: vacationProductReducer,
  newVacation: addCitiesReducer,
  hotelReducer: allHotelsReducer,
  delhotelReducer: hotelsReducer,
  addCarReducer: newCarReducer,
  carsReducer: allCarsReducer,
  addPackageReducer: newPackageReducer,
  packagesReducer: allPackagesReducer,
  allDestinationReducer: destinationReducer,
  newDestination: addNewDestinationReducer,
  newReview: newReviewReducer,
  hotelReviews: hotelReviewsReducer,
  review: reviewReducer,
  newPackageReview:newReviewPackageReducer,
  packageReview:packageReviewsReducer,
  delPackageReview:reviewPackageReducer,
  newCarReview:newReviewCarReducer,
  carReview:carReviewsReducer,
  delCarReview:reviewCarReducer,
  // allVacation: allCitiesReducer,
  // userLogin: userLoginReducer,
  // userLogin: userLoginReducer,
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
