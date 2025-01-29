import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/writediary.css";

const WriteDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const navigate = useNavigate();

  // 이모티콘 리스트
  const emojiList = ["😀", "😢", "😡", "😍", "🤔", "😴", "🥳", "🤯", "🙄"];

  // 일기 저장
  const handleSave = () => {
    if (title && content && selectedEmoji) {
      const diaryEntry = {
        id: new Date().getTime(),
        title,
        content,
        date,
        emoji: selectedEmoji,
      };

      const user = JSON.parse(localStorage.getItem("user")); // 로그인된 사용자 정보 가져오기

      if (user) {
        // 기존 로컬 스토리지 데이터 불러오기
        const storedDiaries =
          JSON.parse(localStorage.getItem(`diaries_${user.userId}`)) || [];
        // 새로운 일기 추가
        storedDiaries.push(diaryEntry);
        // 로컬 스토리지에 저장
        localStorage.setItem(
          `diaries_${user.userId}`,
          JSON.stringify(storedDiaries)
        );

        alert("일기가 저장되었습니다.");
        navigate("/diarylist");
      } else {
        alert("로그인 후에 일기를 작성할 수 있습니다.");
        navigate("/login");
      }
    } else {
      alert("제목, 내용, 이모티콘을 모두 입력해주세요.");
    }
  };

  return (
    <div className="diary-write-container">
      <Header />
      <h2>일기 작성</h2>
      <form className="diary-form">
        <div className="input-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="input-group">
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            id="date"
            value={date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>오늘의 기분</label>
          <div className="emoji-container">
            {emojiList.map((emoji, index) => (
              <span
                key={index}
                className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
                onClick={() => setSelectedEmoji(emoji)}
                style={{
                  fontSize: "1.5rem",
                  margin: "5px",
                  cursor: "pointer",
                  border:
                    selectedEmoji === emoji ? "2px solid #f0b6c2" : "none",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 일기를 적어보세요"
          />
        </div>

        <button type="button" onClick={handleSave} className="save-btn">
          저장
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default WriteDiary;
