import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { getVacationProductsBySlug } from "../../Redux/Actions/vacationProductAction";
import "./Cities.css";
import SecNav from "../../Navbar/SecNav";
import { Container } from "@mui/material";
import { getDestinationBySlug } from "../../Redux/Actions/topDestinationAction";

const Cities = ({ props, history }) => {
  let { slug } = useParams();
  let params = useParams();

  console.log(params)
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);
  // console.log(products)
  // const { destinations } = useSelector((state) => state.allDestinationReducer);
  
  useEffect(() => {
    dispatch(getVacationProductsBySlug(slug));
    // dispatch(getDestinationBySlug(slug));
  }, [dispatch, slug]);
  return (
    <>
      <Navbar />
      <SecNav />
      <Container>
        <div className="row container d-flex">
          {products &&
            products.map((data, index) => {
              return (
                <>
                  <div className="col-md-4 my-3">
                    <Link to={`/vacation/${slug}/${data.slug}/${data._id}`}>
                      {console.log(data)}
                      <div className="wrapper-cards">
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
          
        </div>
      </Container>
    </>
  );
};

export default Cities;
