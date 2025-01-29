import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";
import kakaoLogo from "../assets/kakao.png";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  // Kakao SDK
  useEffect(() => {
    const KAKAO_KEY = "a3ea857aca653ce9fd85cdc954a0964d";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
      console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
    }

    // 로그인된 사용자 정보 확인
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.userId);
    }
  }, []);

  // 일반 로그인
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPwChange = (e) => {
    setUserPw(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (userId === "" || userPw === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 로컬 스토리지에서 저장된 사용자 정보 가져오기
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 로그인 정보 확인
    const user = storedUsers.find(
      (storedUser) =>
        storedUser.userId === userId && storedUser.userPw === userPw
    );

    if (user) {
      alert("로그인 성공!");

      // 로그인 성공 후 사용자 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: userId,
          userPw: userPw,
        })
      );

      // 로그인 후 메인 페이지로 이동
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log("Kakao Auth:", authObj);

        // 사용자 정보 가져오기
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log("사용자 정보:", res);
            alert(`${res.kakao_account.profile.nickname}님, 환영합니다!`);

            // 카카오 로그인 정보를 로컬 스토리지에 저장
            localStorage.setItem(
              "user",
              JSON.stringify({
                userId: res.id, // 카카오 아이디 저장
                userPw: "kakao", // 비밀번호는 카카오 로그인으로 설정
              })
            );

            navigate("/");
          },
          fail: (error) => {
            console.error("사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: (err) => {
        console.error("Kakao 로그인 실패:", err);
      },
    });
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <h2 className="login-title">로그인</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="아이디"
            value={userId}
            onChange={handleUserIdChange}
          />
          <input
            type="password"
            className="login-input"
            placeholder="비밀번호"
            value={userPw}
            onChange={handleUserPwChange}
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="kakao-login">
          <button onClick={handleKakaoLogin} className="kakao-login-button">
            <img
              src={kakaoLogo}
              alt="kakao"
              className="kakao-logo"
            />
            카카오톡으로 로그인
          </button>
        </div>

        <p className="login-signup">
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
