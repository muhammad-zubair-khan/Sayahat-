import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core";
// import Box from "@mui/material/Box";
// import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../actions";
import './Sidebar.css'
import {
  // faBook,
  // faBoxOpen,
  // faChartPie,
  // faCog,
  // faFileAlt,
  // faHandHoldingUsd,
  // faSignOutAlt,
  faTable,
  faTimes,
  faHouse,
  // faCalendarAlt,
  // faMapPin,
  // faInbox,
  // faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  // Accordion,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Routes } from "../routes";
// import ThemesbergLogo from "../assets/img/themesberg.svg";
// import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
const useStyle = makeStyles({
  header: {
    background: "#2874f0",
    height: 55,
    zIndex: -1,
  },
  btn: {
    color: "#2874f0",
    background: "#FFFFFF",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    padding: "5px 40px",
    height: 32,
    boxShadow: "none",
  },
  logoText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bolder",
    fontFamily: "sans-serif",
    marginLeft: "10%",
    // marginBottom: 8,
    lineHeight: 2,
    textDecoration: "none",
    "&:hover": {
      color: "white",
    },
  },
  box: {
    margin: "0 7% 0 auto",
    display: "flex",
    "& > *": {
      marginRight: 50,
      fontSize: 12,
      textDecoration: "none",
      alignItems: "center",
    },
  },
});

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};
const Sidebar = (props = {}) => {
  const classes = useStyle();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const renderLoggedInLinks = () => {
    return (
        <span
          className={classes.btn}
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          Signout
          </span>
    );
  };

  

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey} style={{ border: "none" }}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#2e3650" }}
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      // icon,
      // image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {/* {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null} */}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand className="me-lg-5" as={Link} to="/">
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  {/* <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  /> */}
                </div>
                <div className="d-block">
                  <h6>Hi, Admin</h6>
              {auth.authenticate && renderLoggedInLinks()}

                  {/* <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to="/signin"
                    // to={Routes.SignIn.path}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button> */}
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                title="Admin Dashboard"
                link="/"
                // link={Routes.Presentation.path}
              />
              {auth.authenticate && renderLoggedInLinks()}
              
              <Dropdown.Divider className="mb-2 border-indigo" />

              <NavItem title="Home" link={"/"} icon={faHouse} />


              <div className="wrapper">
    <Accordion title="Category">
      <Link to='/createNewCategory'>Create New Category</Link>
    </Accordion>
    
  </div>

              
             
              
              {/* <CollapsableNavItem
                eventKey="examples/"
                title="Page Examples"
                icon={faFileAlt}
              >
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem
                  title="Forgot password"
                  link={Routes.ForgotPassword.path}
                />
                <NavItem
                  title="Reset password"
                  link={Routes.ResetPassword.path}
                />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem
                  title="500 Server Error"
                  link={Routes.ServerError.path}
                />
              </CollapsableNavItem> */}
              {/* 
              <NavItem
                external
                title="Plugins"
                link="https://demo.themesberg.com/volt-pro-react/#/plugins/datatable"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              /> */}

              {/* <Dropdown.Divider className="my-3 border-indigo" /> */}

              {/* <CollapsableNavItem
                eventKey="documentation/"
                title="Getting Started"
                icon={faBook}
              >
                <NavItem title="Overview" link={Routes.DocsOverview.path} />
                <NavItem title="Download" link={Routes.DocsDownload.path} />
                <NavItem
                  title="Quick Start"
                  link={Routes.DocsQuickStart.path}
                />
                <NavItem title="License" link={Routes.DocsLicense.path} />
                <NavItem
                  title="Folder Structure"
                  link={Routes.DocsFolderStructure.path}
                />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem>
              <CollapsableNavItem
                eventKey="components/"
                title="Components"
                icon={faBoxOpen}
              >
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem
                  external
                  title="Widgets"
                  link="https://demo.themesberg.com/volt-pro-react/#/components/widgets"
                  target="_blank"
                  badgeText="Pro"
                />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;