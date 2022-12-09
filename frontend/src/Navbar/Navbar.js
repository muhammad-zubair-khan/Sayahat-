import { useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/logo-no-background.png";
// import logo from "../Assets/logo/sayahat-logo (2).png";
import { useScrollTrigger } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllVacationsCategory } from "../Redux/Actions/vacationCategoryAction";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
  const vacationCategory = useSelector((state) => state.Vacationcategory);

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
              <label htmlFor="show-features">{category.name}</label>
              {!isMatch && <Link to="#">{category.name}</Link>}
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

  return (
    <>
      <ChangeColorOnScroll {...props}>
        <div className="wrapper">
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
                <li>
                  <Link to="/">Home</Link>
                </li>
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
                    <li>
                      <Link to="/Lahore" className="menues" >Lahore</Link>
                    </li>
                    <li>
                      <Link to="/Islamabad" className="menues" >Islamabad</Link>
                    </li>
                    <li>
                      <Link to="/Peshawar" className="menues" >Peshawar</Link>
                    </li>
                    <li>
                      <Link to="/Kashmir" className="menues" >Kashmir</Link>
                    </li>
                  </ul>
                </li> */}

                <li>
                  <Link to="/hotels">Hotels</Link>
                </li>
                <li>
                  <Link to="/cars">Cars</Link>
                </li>
                {/* <li>
                  <Link to="/lahore">Lahore</Link>
                </li>
                <li>
                  <Link to='/tours'>
                    Tours
                  </Link>
                </li> */}
                <li>
                  <Link to="/aboutus">About us</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact Us</Link>
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
