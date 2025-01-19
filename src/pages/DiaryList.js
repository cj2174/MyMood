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

  // 일기 삭제 함수
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("정말로 이 일기를 삭제하시겠습니까?");
    if (confirmDelete) {
      // 삭제된 일기를 제외한 나머지 일기 항목들만 로컬 스토리지에 저장
      const updatedDiaries = diaryEntries.filter((entry) => entry.id !== id);
      localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
      setDiaryEntries(updatedDiaries); // 상태 업데이트하여 UI에 반영
    }
  };

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
        <p className="no-diary">
          저장된 일기가 없습니다. <br />
          일기를 작성해보세요!
        </p>
      ) : (
        <div className="diary-grid">
          {diaryEntries.map((entry) => (
            <div key={entry.id} className="diary-card">
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
              <div className="button-container">
                <button
                  className="view-detail-btn"
                  onClick={() => navigate(`/diarydetail/${entry.id}`)} // id로 상세 페이지 이동
                >
                  자세히 보기
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(entry.id)} // 삭제 버튼 클릭 시 handleDelete 실행
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DiaryList;
