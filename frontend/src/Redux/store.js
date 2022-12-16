import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer, allAdminsReducer } from "./Reducers/adminReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import { vacationProductReducer,addCitiesReducer,allCitiesReducer } from "./Reducers/VacationProductReducer";
import { allHotelsReducer, hotelsReducer } from "./Reducers/hotelReducer";
import { allCarsReducer, newCarReducer } from "./Reducers/carReducer";
import { allPackagesReducer, newPackageReducer } from "./Reducers/packageReducer";
import { allUsersReducer, userAuthReducer } from "./Reducers/userReducers";

const reducer = combineReducers({
  // auth: authReducer,
  // allAdmins: allAdminsReducer,
  userAuth: userAuthReducer,
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
  // userAuth: userAuthReducer,
  // allUsers: allUsersReducer,

  
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
