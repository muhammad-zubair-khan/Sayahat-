// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo/logo-black.png";
// const Sidebar = () => {

//   return (
//     <div>
//       <aside className="navbar-aside" id="offcanvas_aside">
//         <div className="aside-top">
//           <Link to="/" className="brand-wrap">
//             <img
//               src={logo}
//               alt="Sayahat logo"
//               className="logo"
//               style={{ height: "46px" }}
//             />
//           </Link>
//         </div>

//         <div>
//           <button className="btn btn-icon btn-aside-minimize" >
//             <i className="text-muted fas fa-stream"></i>
//           </button>
//         </div>

//         <nav>
//           <ul className="menu-aside">
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/"
//                 exact={true}
//               >
//                 <i className="icon fas fa-home"></i>
//                 <span className="text">Dashboard</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/products"
//               >
//                 <i className="icon fas fa-shopping-bag"></i>
//                 <span className="text">Products</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/addproduct"
//               >
//                 <i className="icon fas fa-cart-plus"></i>
//                 <span className="text">Add product</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/category"
//               >
//                 <i className="icon fas fa-list"></i>
//                 <span className="text">Categories</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/orders"
//               >
//                 <i className="icon fas fa-bags-shopping"></i>
//                 <span className="text">Orders</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link"
//                 to="/users"
//               >
//                 <i className="icon fas fa-user"></i>
//                 <span className="text">Users</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link disabled"
//                 to="/sellers"
//               >
//                 <i className="icon fas fa-store-alt"></i>
//                 <span className="text">sellers</span>
//               </NavLink>
//             </li>
//             <li className="menu-item">
//               <NavLink
//                 activeClassName="active"
//                 className="menu-link disabled"
//                 to="/transaction"
//               >
//                 <i className="icon fas fa-usd-circle"></i>
//                 <span className="text">Transactions</span>
//               </NavLink>
//             </li>
//           </ul>
//           <br />
//           <br />
//         </nav>
//       </aside>

//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import logo from "../assets/logo/logo-no-background.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/inbox",
  //       name: "Inbox ",
  //       icon: <FaUser />,
  //     },

  //   ],
  // },
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
    dispatch(logout());
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

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
              <h5 style={{marginBottom: '0'}}>{user.fullName}</h5>
              <span style={{marginBottom: '15px'}}>{user.email}</span>
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

        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
