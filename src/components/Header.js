import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLogin(!!user); // user가 있으면 로그인 상태로 처리
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
    checkLoginStatus(); // 로그인 상태 업데이트
    navigate("/");
  };

  const handleWriteDiary = () => {
    if (!isLogin) {
      navigate("/login"); // 로그인되지 않으면 로그인 페이지로 이동
    } else {
      navigate("/writediary"); // 로그인되었으면 일기 작성 페이지로 이동
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Today Mood Logo" className="logo-image" />
      </Link>
      <nav className="header-nav">
        {isLogin ? (
          <>
            <Link to="/diarylist" className="header-link">
              내 일기장
            </Link>
            <span onClick={handleWriteDiary} className="header-link">
              일기 작성
            </span>
            <span onClick={handleLogout} className="header-link logout">
              로그아웃
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className="header-link">
              로그인
            </Link>
            <Link to="/signup" className="header-link">
              회원가입
            </Link>
            <span onClick={handleWriteDiary} className="header-link">
              일기 작성
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
