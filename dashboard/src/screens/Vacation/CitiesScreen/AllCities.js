import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { getAllDestinations } from "../../../Redux/Actions/topDestinationAction";
import { getAllVacationProduct } from "../../../Redux/Actions/vacationProductAction";

const AllCities = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);
  // const { destinations } = useSelector((state) => state.allDestinationReducer);
  // console.log("products>>>>",products);
  // console.log("destinations>>>>",destinations);
  useEffect(() => {
    dispatch(getAllVacationProduct());
    // dispatch(getAllDestinations())
  }, []);
  return (
    <>
      <Sidebar>
        <Header />

        <div className="row container-fluid d-flex">
          {products &&
            products.map((data, index) => {
              return (
                <>
                  <div className="col-md-4 my-3" key={index}>
                    <Link to={`/vacations/${data.slug}/add`}>
                      <div className="wrapper">
                        <img
                          src={data.productVacationPicture}
                          style={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          alt=""
                        />
                        <h3 className="wrapper-text">{data.name}</h3>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}

          {/* {destinations &&
            destinations.map((data, index) => {
              return (
                <>
                  <div className="col-md-4 my-3" key={index}>
                    <Link to={`/vacations/${data.slug}/add`}>
                      <div className="wrapper">
                        <img
                          src={data.destinationPicture}
                          style={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          alt=""
                        />
                        <h3 className="wrapper-text">{data.name}</h3>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })} */}
        </div>
      </Sidebar>
    </>
  );
};

export default AllCities;
