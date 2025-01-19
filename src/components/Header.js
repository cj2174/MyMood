import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // 로그인 상태를 확인하고 설정하는 함수
  const checkLoginStatus = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLogin(!!user); // user가 있으면 로그인 상태로 처리
  };

  // 컴포넌트가 마운트될 때와 로그인 상태가 변경될 때마다 실행
  useEffect(() => {
    checkLoginStatus();
  }, []); // 처음 렌더링될 때 실행 (최초 마운트 시 로그인 상태 체크)

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
    checkLoginStatus(); // 로그인 상태 업데이트
    navigate("/"); // 메인 페이지로 이동
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
            <Link to="/signup" className="header-link">
              회원가입
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
