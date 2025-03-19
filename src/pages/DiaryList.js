import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/diarylist.css";
import Header from "../components/Header";
import axios from "axios";

const DiaryList = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 로그인된 사용자 정보 확인
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // json-server에서 해당 사용자의 일기 목록 가져오기
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/diaries?userId=${user.userId}`
        );
        const diaries = response.data;

        // 날짜순으로 정렬
        const sortedDiaries = diaries.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setDiaryEntries(sortedDiaries);
      } catch (error) {
        console.error("일기 목록 불러오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaries();
  }, [user, navigate]);

  // 일기 삭제 함수
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말로 이 일기를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/diaries/${id}`);
        const updatedDiaries = diaryEntries.filter((entry) => entry.id !== id);
        setDiaryEntries(updatedDiaries);
      } catch (error) {
        console.error("일기 삭제 오류:", error);
        alert("일기 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="diary-list-container">
      <Header />
      <div className="diary-header">
        <h2>내 일기장</h2>
        <button onClick={() => navigate("/writediary")}>+ 새 일기 작성</button>
      </div>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : diaryEntries.length === 0 ? (
        <p>
          저장된 일기가 없습니다. <br />
          일기를 작성해보세요!
        </p>
      ) : (
        <div className="diary-grid">
          {diaryEntries.map((entry) => (
            <div key={entry.id} className="diary-card">
              <h3>{entry.title}</h3>
              <p className="diary-date">{entry.date}</p>
              <p>{entry.content.slice(0, 100)}</p>
              <button onClick={() => navigate(`/diarydetail/${entry.id}`)}>
                자세히 보기
              </button>
              <button onClick={() => handleDelete(entry.id)}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryList;
