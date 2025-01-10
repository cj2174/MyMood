import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <h2 className="header-title">Today Mood</h2>
      <nav className="header-nav">
        <Link to="/" className="header-link">
          로그인
        </Link>
        <Link to="/" className="header-link">
          일기작성
        </Link>
      </nav>
    </header>
  );
};

export default Header;
