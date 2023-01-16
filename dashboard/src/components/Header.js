import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../Redux/Actions/authActions";
import { useHistory } from "react-router-dom";
import { getAllBookedCars } from "../Redux/Actions/bookCarAction";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { getAllBookedPackages } from "../Redux/Actions/bookPackageAction";
import { getAllBookedHotels } from "../Redux/Actions/bookHotelAction";

const Header = () => {
  const { bookedCars } = useSelector((state) => state.allBookedCars);
  const { bookedPackages } = useSelector((state) => state.allBookedPackages);
  const { bookedHotels } = useSelector((state) => state.allBookedHotels);

  const history = useHistory();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
    dispatch(getAllBookedCars());
    dispatch(getAllBookedPackages());
    dispatch(getAllBookedHotels());
  }, [theme, dispatch]);
  const logoutt = () => {
    dispatch(signout());
  };
  const handleMove = () => {
    history.push("/booking");
  };
  let unreadCount = 0;
  const rows = [];
  bookedCars &&
    bookedCars.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.user,
        firstName: item.CarContactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });
  // let unreadCount = 0;
  const rows1 = [];
  bookedPackages &&
    bookedPackages.forEach((item) => {
      rows1.push({
        id: item._id,
        user: item.user,
        firstName: item.contactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });
  // let unreadCount = 0;
  const rows2 = [];
  bookedHotels &&
    bookedHotels.forEach((item) => {
      rows2.push({
        id: item._id,
        user: item.user,
        firstName: item.hotelContactInfo.firstName,
        price: item.price,
        paidAt: item.paidAt,
        view: item.view,
      });
      if (item.view === "unread") {
        unreadCount = unreadCount + 1;
      }
    });
  // useEffect(() => {
  //   dispatch(getAllBookedCars());
  // }, [dispatch]);
  return (
    <header className={`main-header navbar ${theme}`}>
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              type="text"
              list="search_terms"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search-terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="zubair khan" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <ul className="nav">
          <li className="nav-item">
            <Link
              className={`nav-link btn-icon`}
              title="Dark-mode"
              onClick={toggleTheme}
            >
              <i className="fas fa-moon"></i>
            </Link>
            {/* <button onClick={toggleTheme}>
            <i className="fas fa-moon"></i>
            </button> */}
          </li>
          <li className="nav-item">
            {/* <button className="nav-link btn-icon" onClick={handleMove}>
              <i className="fas fa-bell"></i>
            </button> */}

            <Badge
              badgeContent={unreadCount}
              style={{ cursor: "pointer" }}
              onClick={handleMove}
              color="primary"
              // title={bookedCars && bookedCars.length > 0 ? `${bookedCars.length} New Message` : "No New Messages"}
              title={`${unreadCount} New Message`}
            >
              <MailIcon color="action" />
            </Badge>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                style={{ width: "50px" }}
                className="img-xs rounded-circle"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
              <Link className="dropdown-item" to="#">
                settings
              </Link>
              <Link className="dropdown-item text-danger" onClick={logoutt}>
                logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
