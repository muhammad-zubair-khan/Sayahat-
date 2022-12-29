import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/logo-no-background.png";
// import logo from "../Assets/logo/sayahat-logo (2).png";
import { useScrollTrigger } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVacationsCategory } from "../Redux/Actions/vacationCategoryAction";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneIcon from "@mui/icons-material/Phone";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import HotelIcon from "@mui/icons-material/Hotel";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { signout } from "../Redux/Actions/authActions";
import DropdownMenu from "../Components/MaterialUI/DropdownMenu";

function ChangeColorOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: { background: trigger ? "black" : "transparent" },
  });
}

const Navbar = (props) => {
  const { user } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  const vacationCategory = useSelector((state) => state.Vacationcategory);
  console.log(vacationCategory);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVacationsCategory());
  }, [dispatch]);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  const [setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const logout = () => {
    dispatch(signout());
  };

  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  const displayCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <>
              <Link to={`/vacation/${category.slug}`} className="menues">
                {category.name}
              </Link>
            </>
          ) : (
            <>
              <label htmlFor="show-features">
                <HouseboatIcon style={{ width: "18px", height: "15px" }} />{" "}
                {category.name}
              </label>
              {!isMatch && (
                <Link to="#">
                  <HouseboatIcon style={{ width: "18px", height: "15px" }} />{" "}
                  {category.name}
                </Link>
              )}
              <input type="checkbox" id="show-features" />
              {/* <Link>
              {category.name}
             </Link>
                  <label for="show-features">{category.name}</label>
             <input type="checkbox" id="show-features" /> */}
            </>
          )}

          {category.children.length > 0 ? (
            <ul>{displayCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };
  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <Link
            className="fullName"
            style={{
              textTransform: "uppercase",
              background: "#f78536",
              color: "white",
            }}
          >
            {user.fullName}
          </Link>
        }
        menus={[
          { label: "My Profile", href: "/myProfile", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <Link to="/login">
        <PermIdentityIcon style={{ width: "18px", height: "15px" }} />
        Account
      </Link>
    );
  };
  return (
    <>
      <ChangeColorOnScroll {...props}>
        <div className="wrapper1">
          <nav>
            <input type="checkbox" id="show-search" />
            <input type="checkbox" id="show-menu" />
            <label for="show-menu" className="menu-icon">
              <i className="fas fa-bars"></i>
            </label>
            <div className="content">
              <div className="logo">
                <Link to="/">
                  <img src={logo} width="200px" alt="Sayahat" />
                </Link>
              </div>
              <ul className="links">
                {/* <li>
                  <Link to="/">Home</Link>
                </li> */}
                {vacationCategory.categories.length > 0
                  ? displayCategories(vacationCategory.categories)
                  : null}
                {/* <input type="checkbox" id="show-features" /> */}

                {/* <li>
                  <Link to="#" className="desktop-link">
                    Vacations
                  </Link>
                  <input type="checkbox" id="show-features" />
                  <label for="show-features">Vacations</label>
                  <ul>
                    <li>
                      <Link to="/Karachi" className="menues" >Karachi</Link>
                    </li>
                  </ul>
                </li> */}

                <li>
                  <Link to="/hotels-list">
                    <HotelIcon style={{ width: "18px", height: "15px" }} />{" "}
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link to="/car-rentals">
                    <DirectionsCarIcon
                      style={{ width: "18px", height: "15px" }}
                    />{" "}
                    Cars
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus">
                    <TipsAndUpdatesIcon
                      style={{ width: "18px", height: "15px" }}
                    />{" "}
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/contactus">
                    <PhoneIcon style={{ width: "18px", height: "15px" }} />{" "}
                    Contact Us
                  </Link>
                </li>
                <li>
                  {auth.authenticate
                    ? renderLoggedInMenu()
                    : renderNonLoggedInMenu()}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </ChangeColorOnScroll>
    </>
  );
};

export default Navbar;
