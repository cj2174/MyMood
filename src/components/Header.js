import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <h2 className="header-title">Today Mood</h2>
      <nav className="header-nav">
        <button className="header-link">로그인</button>
        <button className="header-link">일기작성</button>
      </nav>
    </header>
  );
};

export default Header;
