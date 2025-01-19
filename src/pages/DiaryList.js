import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/diarylist.css";
import { useNavigate } from "react-router-dom";

const DiaryList = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const navigate = useNavigate();

  // 로컬 스토리지에서 저장된 일기 데이터를 불러오기
  useEffect(() => {
    const storedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
    setDiaryEntries(storedDiaries);
  }, []);

  return (
    <div className="diary-list-container">
      <Header />
      <div className="diary-header">
        <h2>내 일기장</h2>
        <button
          className="add-diary-btn"
          onClick={() => navigate("/writediary")}
        >
          + 새 일기 작성
        </button>
      </div>
      {diaryEntries.length === 0 ? (
        <p className="no-diary">저장된 일기가 없습니다. 일기를 작성해보세요!</p>
      ) : (
        <div className="diary-grid">
          {diaryEntries.map((entry, index) => (
            <div key={index} className="diary-card">
              <div className="diary-card-header">
                <span className="diary-date">{entry.date}</span>
                <span className="diary-emoji">{entry.emoji}</span>
              </div>
              <h3 className="diary-title">{entry.title}</h3>
              <p className="diary-content">
                {entry.content.length > 50
                  ? entry.content.slice(0, 50) + "..."
                  : entry.content}
              </p>
              <button
                className="view-detail-btn"
                onClick={() => navigate(`/diarydetail/${entry.id}`)}
              >
                자세히 보기
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DiaryList;
