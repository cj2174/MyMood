import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleMoodClick = () => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      navigate("/writediary");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <h1 className="home-title">Today Mood</h1>
        <p className="home-description">
          오늘 기분에 맞는 이모티콘으로,
          <br />
          Today Mood에 하루를 담아보세요.
        </p>
        <div className="mood-icons">
          <span>😊</span>
          <span>😢</span>
          <span>😡</span>
          <span>😌</span>
        </div>
        <button className="start-button" onClick={handleMoodClick}>
          오늘의 기분 기록하기 ✍️
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
