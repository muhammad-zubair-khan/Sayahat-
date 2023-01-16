import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allAdminsReducer, registerAdminReducer } from "./Reducers/adminReducers";
import { VacationCategoryReducer } from "./Reducers/vacationCategoryReducer";
import { vacationProductReducer,addCitiesReducer } from "./Reducers/VacationProductReducer";
import { allHotelsReducer, hotelsReducer, newHotelReducer } from "./Reducers/hotelReducer";
import { allCarsReducer, newCarReducer } from "./Reducers/carReducer";
import { allPackagesReducer, newPackageReducer } from "./Reducers/packageReducer";
import { allRoomsReducer } from "./Reducers/roomReducer";
import { authReducer } from "./Reducers/authReducers";
import { allBookedCarsReducer, bookedCarDetailReducer } from "./Reducers/bookCarReducer";
import { allBookedPackagesReducer, deleteBookedPackageReducer } from "./Reducers/bookPackageReducer";
import { allBookedHotelsReducer } from "./Reducers/bookedHotelReducer";

const reducer = combineReducers({
  auth: authReducer,
  registerAuth: registerAdminReducer,
  allAdmins: allAdminsReducer,
  Vacationcategory: VacationCategoryReducer,
  vacationProduct: vacationProductReducer,
  newVacation: addCitiesReducer,
  hotelReducer: allHotelsReducer,
  newHotelReducer: newHotelReducer,
  delhotelReducer: hotelsReducer,
  addCarReducer: newCarReducer,
  carsReducer: allCarsReducer,
  addPackageReducer: newPackageReducer,
  packagesReducer: allPackagesReducer,
  delBookedPackageReducer:deleteBookedPackageReducer,
  allRooms: allRoomsReducer,


  allBookedCars:allBookedCarsReducer,
  bookedCarDetail:bookedCarDetailReducer,

  allBookedPackages:allBookedPackagesReducer,
  allBookedHotels:allBookedHotelsReducer,

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
