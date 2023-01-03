import React from "react";
import { Link } from "react-router-dom";
import './DropdownMenu.css'

const DropdownMenu = (props) => {
    return (
      <div className="headerDropdownContainer">
        {props.menu}
        <div className="dropdown">
          {/* <div className="upArrowContainer">
            <div className="upArrow"></div>
          </div> */}
          <div className="dropdownMenu">
            {props.firstMenu}
            <ul className="headerDropdownMenu" >
              {props.menus &&
                props.menus.map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick && item.onClick();
                        }
                      }}
                      to={`${item.href}`}
                      style={{color: 'black'}}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const MaterialButton = (props) => {
    const onClick = () => {
      props.onClick && props.onClick();
    };
    return (
      <div
        style={{
          width: "100%",
          ...props.style,
        }}
      >
        <button
          className="materialButton"
          style={{
            backgroundColor: props.bgColor,
            color: props.textColor,
            fontSize: props.fontSize,
          }}
          onClick={onClick}
        >
          {props.icon && props.icon}
          {props.title && props.title}
        </button>
      </div>
    );
  };
export {DropdownMenu,MaterialButton}