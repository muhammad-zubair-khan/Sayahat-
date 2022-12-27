import React, { useEffect } from "react";
import "./MyCard.css";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "./Redux/Actions/packageAction";
import { Button, Grid } from "@mui/material";
import { ImageUrl } from "./Redux/UrlConfig";

const MyCard = () => {
  const history = useHistory();
  const params = useParams();
  const { packages } = useSelector((state) => state.packagesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  const cardData = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/1.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  const cardDataTwo = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/2.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  const cardDataThree = [
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
    {
      image: "http://zwin.io/html/viaje/assets/img/destination-list/3.png",
      country: "Lahore",
      description: "Atmosphere of the sunny country",
      date: "8 Oct",
      days: 4,
      rating: 4.5,
      dicPrice: 620,
      price: 720,
    },
  ];

  let [count, setcount] = useState(1);

  // let [progress, setprogress] = useState(27);
  let [progress, setprogress] = useState(30);

  // const [isDisabled, setDisabled] = useState(false);

  let countIncrement = () => {
    if (count < 3) {
      setcount(count + 1);
      setprogress(progress + 35);
    } else {
      // document.getElementById("nextBtn").style.display = 'none';
      // setDisabled(true);
      // buttonRef.current.disabled = true;
      console.log("disabled");
    }
  };

  const countDecrement = () => {
    if (count > 1) {
      setcount(count - 1);
      setprogress(progress - 30);
      // document.getElementById("nextBtn").style.display = 'block';
    }
  };
  const [show, setShow] = useState(false);
  const handleTour = () => {};

  return (
    <>
      {/* <div className="container">
        <Link className="card1" to="#" onMouseEnter={handleShow} onMouseLeave={handleHide}>
          <h3>Naran</h3>
         {show && <p className="small">
            Card description with lots of great facts and interesting details.
          </p>}
          <div className="go-corner" href="#">
            <div className="go-arrow">→</div>
          </div>
        </Link>
      </div> */}

      <Grid container>
        {packages.map((item, index) => {
          return (
            <Grid md={4}>
              <div className="card1">
                <div key={index}>
                  <img
                    src={ImageUrl(item.packageImages[0].img)}
                    className="card-img"
                    alt=""
                  />
                  <h2 className="heading-card">{item.city}</h2>
                  <div className="content-1">
                    <h3>{item.name}</h3>
                    <Link to={`/vacation/${item.product}/${item.city}/${item._id}/detail`}>
                      <Button variant="contained" style={{color:'white', backgroundColor:'#e17c35'}} onClick={handleTour}>
                        Tour Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MyCard;
