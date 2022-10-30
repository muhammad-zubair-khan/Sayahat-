import React from "react";
import { useSelector,useDispatch } from "react-redux";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Sidebar>
        <Header />
        <h1>HomeScreen</h1>
      </Sidebar>
    </>
  );
};

export default HomeScreen;
