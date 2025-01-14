import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/signup.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <Header />
      <main className="signup-main">
        <h2 className="signup-title">회원가입</h2>
        <form className="signup-form">
          <input
            type="text"
            className="signup-input"
            placeholder="아이디"
          ></input>
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호"
          ></input>
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호 확인"
          ></input>
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
