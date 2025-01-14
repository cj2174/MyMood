import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 확인
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
    setIsLogin(false); // 로그인 상태 해제
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Today Mood Logo" className="logo-image" />
      </Link>
      <nav className="header-nav">
        {isLogin ? (
          <>
            <Link to="/mydiary" className="header-link">
              내 일기장
            </Link>
            <Link to="/writediary" className="header-link">
              일기작성
            </Link>
            <span onClick={handleLogout} className="header-link logout">
              로그아웃
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">
              로그인
            </Link>
            <Link to="/writediary" className="header-link">
              일기작성
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
