import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/diarylist.css";
import Header from "../components/Header";

const DiaryList = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); // 일기 목록 상태
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 로그인된 사용자 정보 확인
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      // 로그인된 사용자가 없으면 로그인 페이지로 리다이렉트
      navigate("/login");
      return;
    }

    // 로컬 스토리지에서 해당 사용자 일기 목록 가져오기
    const storedDiaries =
      JSON.parse(localStorage.getItem(`diaries_${user.userId}`)) || [];

    // 날짜순 정렬
    const sortedDiaries = storedDiaries.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // 상태가 이미 로딩된 일기와 동일한 경우 업데이트하지 않도록 방지
    if (JSON.stringify(diaryEntries) !== JSON.stringify(sortedDiaries)) {
      setDiaryEntries(sortedDiaries);
    }

    setIsLoading(false); // 데이터 로딩 완료
  }, [user, navigate, diaryEntries]);

  // 일기 삭제 함수
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("정말로 이 일기를 삭제하시겠습니까?");
    if (confirmDelete) {
      const updatedDiaries = diaryEntries.filter((entry) => entry.id !== id);
      localStorage.setItem(
        `diaries_${user.userId}`,
        JSON.stringify(updatedDiaries)
      );
      setDiaryEntries(updatedDiaries);
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
              <button onClick={() => handleDelete(entry.id)}>🗑 삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryList;
