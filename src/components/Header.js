import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Today Mood Logo" className="logo-image" />
      </Link>
      <nav className="header-nav">
        <Link to="/login" className="header-link">
          로그인
        </Link>
        <Link to="/writediary" className="header-link">
          일기작성
        </Link>
      </nav>
    </header>
  );
};

export default Header;
