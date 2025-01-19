import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/diarydetail.css";

const DiaryDetail = () => {
  const { id } = useParams(); // URL의 id 파라미터를 사용해서 해당 일기 조회
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  // 로컬 스토리지에서 일기 항목을 불러오기
  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
    // 일기 id가 일치하는 항목을 찾음
    const diary = storedDiaries.find((entry) => entry.id === parseInt(id)); // id는 숫자이므로 parseInt로 변환
    if (diary) {
      setDiaryEntry(diary);
    } else {
      alert("해당 일기를 찾을 수 없습니다.");
      navigate("/diarylist"); // 일기 리스트로 리다이렉트
    }
    setLoading(false); // 로딩 끝
  }, [id, navigate]);

  if (loading) {
    return <p>일기를 불러오는 중...</p>;
  }

  return (
    <div className="diary-detail-container">
      <Header />
      <div className="diary-detail">
        <button className="back-btn" onClick={() => navigate("/diarylist")}>
          돌아가기
        </button>
        <div className="diary-header">
          <span className="diary-date">{diaryEntry.date}</span>
          <span className="diary-emoji">{diaryEntry.emoji}</span>
        </div>
        <div className="diary-body">
          <h2 className="diary-title">{diaryEntry.title}</h2>
          <p className="diary-content">{diaryEntry.content}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiaryDetail;
