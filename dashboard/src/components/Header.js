import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/adminActions";
const Header = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const dispatch = useDispatch();
  const logoutt = () => {
    dispatch(logout());
  };

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
            <Link className={`nav-link btn-icon`} title="Dark-mode" onClick={toggleTheme}>
            <i className="fas fa-moon"></i>
            </Link>
            {/* <button onClick={toggleTheme}>
            <i className="fas fa-moon"></i>
            </button> */}
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" style={{width:'50px'}} className="img-xs rounded-circle" alt="User" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/profile">
                My Profile
              </Link>
              <Link className="dropdown-item" to="#">
                settings
              </Link>
              <Link className="dropdown-item text-danger" onClick={logoutt}
>
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
