import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {getAllVacationsCategory} from '../Redux/Actions/vacationCategoryAction'

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {categories} = useSelector((state) => state.Vacationcategory)

  useEffect(() => {
    dispatch(getAllVacationsCategory())
  
  }, [])
  
  return (
    <>
      <Sidebar>
        <Header />
        {/* <h1>{categories}</h1> */}
        
      </Sidebar>
    </>
  );
};

export default HomeScreen;
