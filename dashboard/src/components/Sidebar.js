import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import logo from "../assets/logo/logo-no-background.png";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Redux/Actions/authActions";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/vacation",
    name: "Vacations",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/vacations/punjab",
        name: "Punjab ",
        icon: <FaUser />,
      },
      {
        path: "/vacations/KhyberPakhtunkhwa",
        name: "Khyber Pakhtunkhwa",
        icon: <FaLock />,
      },
      {
        path: "/vacations/Sindh",
        name: "Sindh",
        icon: <FaMoneyBill />,
      },
      {
        path: "/vacations/Balochistan",
        name: "Balochistan",
        icon: <FaMoneyBill />,
      },
      {
        path: "/vacations/Kashmir",
        name: "Kashmir",
        icon: <FaMoneyBill />,
      },
      {
        path: "/vacations/Gilgitbaltistan",
        name: "Gilgit Baltistan",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/users",
    name: "Users",
    icon: <BsCartCheck />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <AccountBoxIcon />,
  },
];
const Sidebar = ({ children, history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logoutt = () => {
    dispatch(signout());
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="main-container">
        {/* <div className="child-container"> */}

        <motion.div
          animate={{
            width: isOpen ? "290px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <Link to={`/`}>
                  <motion.img
                    // variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                    src={logo}
                  ></motion.img>
                </Link>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          {isOpen && (
            <div className="avatar">
              <img
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                alt="avatar"
                style={{
                  borderRadius: "100%",
                  width: "65px",
                  marginBottom: "10px",
                }}
              />
              <h5 style={{ marginBottom: "0" }}>{user.fullName}</h5>
              <span style={{ marginBottom: "15px" }}>{user.email}</span>
              <span
                style={{
                  color: "#2874f0",
                  background: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  padding: "5px 40px",
                  height: 32,
                  boxShadow: "none",
                  cursor: "pointer",
                }}
                onClick={logoutt}
              >
                Signout
              </span>
            </div>
          )}

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        // variants={showAnimation}
                        // initial="hidden"
                        // animate="show"
                        // exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        {/* </div> */}

        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
