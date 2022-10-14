import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/SAYAHAT.png";
import { useScrollTrigger } from "@mui/material";
import React,{useState,useEffect} from "react";
import "./Navbar.css";

function ChangeColorOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: { background: trigger ? "white" : "white", },
  });
}


const Navbar = (props) => {
  
  const [prevScrollPos, setPrevScrollPos] = useState(0);
const [visible, setVisible] = useState(true)

const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if(currentScrollPos > prevScrollPos){
        setVisible(false)
    }else{
        setVisible(true)
    }

    setPrevScrollPos(currentScrollPos)
}

useEffect( () => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
})

  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

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
                <li>
                  <Link to="#" className="desktop-link">
                    Vacations
                  </Link>
                  <input type="checkbox" id="show-features" />
                  <label for="show-features">Vacations</label>
                  <ul>
                    <li>
                      <Link to="/Karachi">Karachi</Link>
                    </li>
                    <li>
                      <Link to="/Lahore">Lahore</Link>
                    </li>
                    <li>
                      <Link to="/Islamabad">Islamabad</Link>
                    </li>
                    <li>
                      <Link to="/Peshawar">Peshawar</Link>
                    </li>
                    <li>
                      <Link to="/Kashmir">Kashmir</Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/hotels">Hotels</Link>
                </li>
                <li>
                  <Link to="/cars">Cars</Link>
                </li>
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
