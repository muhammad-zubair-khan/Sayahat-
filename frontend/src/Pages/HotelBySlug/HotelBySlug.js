import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getHotelBySlug } from "../../Redux/Actions/hotelAction";
import Card from "../../Components/Card/Card";
import { MaterialButton } from "../../Components/MaterialUI";
import Rating from "../../Components/Rating/Rating";
import Price from "../../Components/Price/Price";
import { ImageUrl } from "../../Redux/UrlConfig";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const HotelBySlug = (props) => {
  const { slug } = useParams();
  const { hotelsByPrice } = useSelector((state) => state.hotelReducer);
  const hotels = useSelector((state) => state.hotelReducer);
  const priceRange = hotelsByPrice;
  console.log(priceRange);

  const dispatch = useDispatch();
  // console.log(hotels.hotels.hotelImages)
  useEffect(() => {
    dispatch(getHotelBySlug(slug));
  }, [dispatch, slug]);

  //   if(Object.keys(hotels.hotelsByPrice).length === 0){
  //     return null;
  //   }
  return (
    <>
      {Object.keys(hotelsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} Hotel under ${[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex"}}>
              {hotels &&
                hotelsByPrice[key].map((product) => (
                  <Link
                    to={`/${product.slug}/${product._id}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "#000",
                      margin: '0px 40px' 
                    }}
                    className="productContainer"
                  >
                    <div className="productImgContainer d-flex">
                        {/* <Zoom> */}
                      {hotels.hotels &&
                        hotels.hotels.map((item) => (

                          <img
                            src={ImageUrl(item.hotelImages[0].img)}
                            style={{ width: "27%", height: "140px",margin: '0px 4px' }}
                            alt=""
                            />
                            ))}
                            {/* </Zoom> */}
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "10px 0" }}>{product.name}</div>
                      <div>
                        <Rating value="4.3" />
                        &nbsp;&nbsp;
                        <span
                          style={{
                            color: "#777",
                            fontWeight: "500",
                            fontSize: "12px",
                          }}
                        >
                          (3353)
                        </span>
                      </div>
                      <Price value={product.cheapestPrice} />
                    </div>
                  </Link>
                ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default HotelBySlug;
