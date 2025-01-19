import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WriteDiary from "./pages/WriteDiary";
import Signup from "./pages/SignUp";
import DiaryList from "./pages/DiaryList";
import DiaryDetail from "./pages/DiaryDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/writediary" element={<WriteDiary />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/diarylist" element={<DiaryList />} />
        <Route path="/diarydetail" element={<DiaryDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
