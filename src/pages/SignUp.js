import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  // 아이디 입력
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  // 비밀번호 입력
  const handleUserPwChange = (e) => {
    setUserPw(e.target.value);
  };

  // 비밀번호 확인
  const handleConfirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };

  // 폼 제출
  const handleSubmit = (e) => {
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

    console.log("회원가입 성공", { userId, userPw });

    // 로컬 스토리지에 회원 정보 저장 (로그인 상태는 변경하지 않음)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push({ userId, userPw });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // 회원가입 완료 메시지 후 로그인 페이지로 리디렉션
    alert("회원가입 완료");
    navigate("/login");
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
          ></input>
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호"
            value={userPw}
            onChange={handleUserPwChange}
          ></input>
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호 확인"
            value={confirmPw}
            onChange={handleConfirmPwChange}
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
