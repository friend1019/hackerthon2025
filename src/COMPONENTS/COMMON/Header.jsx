import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
import "../../CSS/COMMON/Header.css";
import Logo from "../../IMAGE/logo.svg";
import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <header className="header-top">
        <div className="header-top-container">
          <div className="logo-area">
            <Link to="/" className="logo-link">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <nav className="navbar-container">
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate("/mypage")}> 
                <FiSearch className="nav-icon nav-search" />
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate("/login")}> 
                <FiMenu className="nav-icon nav-hamburger" />
              </button>
            </li>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
