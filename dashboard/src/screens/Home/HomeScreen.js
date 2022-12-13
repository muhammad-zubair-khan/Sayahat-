import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CategoryIcon from "@mui/icons-material/Category";
import HotelIcon from "@mui/icons-material/Hotel";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import TourIcon from '@mui/icons-material/Tour';
import { getAllVacationsCategory } from "../../Redux/Actions/vacationCategoryAction";
import "./HomeScreen.css";
import { Modal, Button } from "react-bootstrap";
import { getAllHotels } from "../../Redux/Actions/hotelAction";
import { getAllCars } from "../../Redux/Actions/carAction";
import { getAllPackages } from "../../Redux/Actions/packageAction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.Vacationcategory);
  // console.log(vacation);
  const {hotels} = useSelector((state) => state.hotelReducer);
  // console.log(hotels)
  const { cars } = useSelector((state) => state.carsReducer);

  const {packages} = useSelector((state)=> state.packagesReducer);

  useEffect(() => {
    dispatch(getAllHotels())
    dispatch(getAllVacationsCategory());
    dispatch(getAllCars())
    dispatch(getAllPackages())
  }, [dispatch]);

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/vacations/add">
              <CategoryIcon />
              <p className="para">Vacations</p>
              <p>
                {categories[0] &&
                 categories[0].children.length}
              </p>
            </Link>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to='/all-hotels'>
              <HotelIcon />
              <p className="para">Hotels</p>
              <p>
                {hotels &&
                  hotels.length}
              </p>
            </Link>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to='/all-cars'>
              <TimeToLeaveIcon />
              <p className="para">Cars</p>
              <p>
                {cars &&
                  cars.length}
              </p>
            </Link>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to='/all-packages'>
              <TourIcon />
              <p className="para">Packages</p>
              <p>
                {packages &&
                  packages.length}
              </p>
            </Link>
          </div>
        </div>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-modal-sizes-title-lg"
              style={{ fontSize: "bold" }}
            >
              Vacations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {categories[0] &&
              categories[0].children.map((item, index) => (
                <li
                  key={index}
                  style={{ fontFamily: "sans-serif", fontSize: "21px" }}
                >
                  {item.name}
                </li>
              ))}
          </Modal.Body>
        </Modal>
      </Sidebar>
    </>
  );
};

export default HomeScreen;
