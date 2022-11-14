import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getVacationProductsBySlug } from "../../Redux/Actions/vacationProductAction";
import { ImageUrl } from "../../Redux/UrlConfig";
import "./AllVacations.css";

const CitiesScreen = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.vacationProduct);
  console.log("products", products);
  useEffect(() => {
    const { match } = props;
    console.log(props);
    dispatch(getVacationProductsBySlug(match.params.slug));
  }, [dispatch, props]);
  return (
    <>
      <Sidebar>
        <Header />
        <div className="row container-fluid d-flex">
          {products &&
            products.map((data, index) => {
              //  ImageUrl(p.productPictures[0].img)
              return (
                <>
                  {/* {ImageUrl(data.productVacationPicture)} */}
                  {/* file:///C:/Users/HAIER/Documents/GitHub/Sayahat-/backend/uploads/xMQaPHknf-Lahore.jpg */}
                  <div className="col-md-4 my-3">
                    <Link to={`${data.slug}`}>
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
        </div>
      </Sidebar>
    </>
  );
};

export default CitiesScreen;
