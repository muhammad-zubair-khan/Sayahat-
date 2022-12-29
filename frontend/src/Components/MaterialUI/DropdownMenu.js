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

  export default DropdownMenu