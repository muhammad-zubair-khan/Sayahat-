import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, allUsersReducer } from "./Reducers/userReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import { vacationProductReducer,addCitiesReducer,allCitiesReducer } from "./Reducers/VacationProductReducer";
import { allHotelsReducer, hotelsReducer } from "./Reducers/hotelReducer";
import { allCarsReducer, newCarReducer } from "./Reducers/carReducer";
import { allPackagesReducer, newPackageReducer } from "./Reducers/packageReducer";

const reducer = combineReducers({
  auth: authReducer,
  allUsers: allUsersReducer,
  Vacationcategory: VacationCategoryReducer,
  vacationProduct: vacationProductReducer,
  newVacation: addCitiesReducer,
  hotelReducer: allHotelsReducer,
  delhotelReducer: hotelsReducer,
  addCarReducer: newCarReducer,
  carsReducer: allCarsReducer,
  addPackageReducer: newPackageReducer,
  packagesReducer: allPackagesReducer,

  
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
