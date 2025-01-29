import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/diarydetail.css";

const DiaryDetail = () => {
  const { id } = useParams();
  const [diaryEntry, setDiaryEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // 현재 로그인된 사용자 정보 가져오기
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const storedDiaries = JSON.parse(localStorage.getItem(`diaries_${user.userId}`)) || [];
    const diary = storedDiaries.find((entry) => entry.id === Number(id)); // id를 숫자로 변환

    if (diary) {
      setDiaryEntry(diary);
    } else {
      alert("해당 일기를 찾을 수 없습니다.");
      navigate("/diarylist");
      return;
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <p>일기를 불러오는 중...</p>;
  }

  if (!diaryEntry) {
    return <p>일기를 찾을 수 없습니다.</p>;
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
