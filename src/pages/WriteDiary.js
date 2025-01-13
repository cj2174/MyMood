import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/writediary.css";

const WriteDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedEmoji, setSelectedEmoji] = useState("");

  // 이모티콘 리스트
  const emojiList = ["😀", "😢", "😡", "😍", "🤔", "😴", "🥳", "🤯", "🙄"];

  // 일기 저장 함수
  const handleSave = () => {
    if (title && content && selectedEmoji) {
      const diaryEntry = {
        title,
        content,
        date,
        emoji: selectedEmoji, // 선택된 이모티콘 추가
      };
      console.log(diaryEntry);
      alert("일기가 저장되었습니다.");
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
