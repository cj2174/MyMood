import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <h2 className="login-title">로그인</h2>
        <form className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="아이디"
          ></input>
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
          ></input>
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
