import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPwChange = (e) => {
    setUserPw(e.target.value);
  };

  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (userPw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (userId === "") {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (userPw.length < 4) {
      alert("비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/users", {
        userId,
        userPw,
      });
      alert("회원가입 완료");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <main className="signup-main">
        <h2 className="signup-title">회원가입</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="signup-input"
            placeholder="아이디"
            value={userId}
            onChange={handleUserIdChange}
          />
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호"
            value={userPw}
            onChange={handleUserPwChange}
          />
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={handleConfirmPwChange}
          />
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
