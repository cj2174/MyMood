import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/login.css";
import kakaoLogo from "../assets/kakao.png";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  // 카카오 SDK 초기화
  useEffect(() => {
    const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
      console.log("Kakao SDK Initialized:", window.Kakao.isInitialized());
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.userId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (userId === "" || userPw === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // json-server에서 사용자 데이터 가져오기
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;
      console.log("Users from DB:", users); // 서버에서 받은 데이터 확인

      // 로그인 정보 확인
      const user = users.find(
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
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 중 오류가 발생했습니다.");
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
          success: async (res) => {
            console.log("사용자 정보:", res);

            // 카카오 사용자 정보
            const kakaoUserId = res.id; // 카카오 아이디
            const kakaoUserName = res.kakao_account.profile.nickname; // 카카오 사용자 이름
            const kakaoUserPw = "kakao"; // 비밀번호는 카카오로 설정

            // 카카오 로그인 정보를 json-server에 저장
            try {
              // 이미 존재하는 사용자 정보인지 확인
              const response = await axios.get("http://localhost:3001/users");
              const users = response.data;

              // 중복된 사용자가 없는 경우에만 저장
              const existingUser = users.find(
                (user) => user.userId === kakaoUserId.toString()
              );

              if (!existingUser) {
                // 사용자 정보가 없으면 새로 저장
                await axios.post("http://localhost:3001/users", {
                  userId: kakaoUserId.toString(), // 카카오는 숫자로 아이디가 오므로 문자열로 변환
                  userPw: kakaoUserPw,
                  userName: kakaoUserName, // 추가적으로 사용자 이름 저장 가능
                });
              }
              alert(`${kakaoUserName}님, 환영합니다!`);
              navigate("/"); // 로그인 후 메인 페이지로 이동
            } catch (error) {
              console.error("카카오 로그인 처리 오류:", error);
              alert("카카오 로그인 중 오류가 발생했습니다.");
            }
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

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPwChange = (e) => {
    setUserPw(e.target.value);
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
            <img src={kakaoLogo} alt="kakao" className="kakao-logo" />
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
