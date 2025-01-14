import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  // 아이디 입력
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  // 비밀번호 입력
  const handleUserPwChange = (e) => {
    setUserPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (userId === "" || userPw === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 로컬 스토리지에서 저장된 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 로그인 정보 확인
    if (
      storedUser &&
      storedUser.userId === userId &&
      storedUser.userPw === userPw
    ) {
      // 로그인 성공 시
      alert("로그인 성공!");

      // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("user", JSON.stringify({ userId, userPw }));

      // 로그인 후 리디렉션
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <h2 className="login-title">로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="아이디"
            value={userId}
            onChange={handleUserIdChange}
          />
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={userPw}
            onChange={handleUserPwChange}
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <p className="login-signup">
          계정이 없으신가요? <a href="/signup"> 회원가입</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
