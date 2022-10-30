import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CategoryIcon from "@mui/icons-material/Category";
import HotelIcon from "@mui/icons-material/Hotel";
import { getAllVacationsCategory } from "../../Redux/Actions/vacationCategoryAction";
import "./HomeScreen.css";
import { Modal, Button } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const vacation = useSelector((state) => state.Vacationcategory);
  console.log(vacation);

  useEffect(() => {
    dispatch(getAllVacationsCategory());
  }, [dispatch]);

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Sidebar>
        <Header />
        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2" onClick={() => setLgShow(true)}>
            <Link>
              <CategoryIcon />
              <p className="para">Vacations</p>
              <p>
                {vacation.categories[0] &&
                  vacation.categories[0].children.length}
              </p>
            </Link>
          </div>
          <div className="dashboardSummaryBox2">
            <Link>
              <HotelIcon />
              <p className="para">Hotels</p>
              <p>0</p>
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
            {vacation.categories[0] &&
              vacation.categories[0].children.map((item, index) => (
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
