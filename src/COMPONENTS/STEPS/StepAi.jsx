// StepAi.jsx
import React, { useState } from "react";
import Header from "../COMMON/Header";
import "../../CSS/STEPS/StepInterest.css";
import { FiChevronLeft } from "react-icons/fi";
import aicourse from "../../IMAGE/aicourse.png";

/** 상단 진행 점(구체) — CSS는 StepInterest.css의 .step-dot 사용 */
const Dot = ({ active = false }) => (
  <span className={`step-dot ${active ? "is-active" : "is-dim"}`} aria-hidden="true" />
);

const StepAi = ({ answers, setAnswers, nextStep, prevStep }) => {
  const [input, setInput] = useState(answers.aiText || "");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleNext = () => {
    if (!input.trim()) return;

    const updatedAnswers = {
      ...answers,
      aiText: input.trim(),
    };

    console.log("✅ StepAi → nextStep으로 넘기는 answers:", updatedAnswers);
    nextStep(updatedAnswers);
  };

  return (
    <>
      <Header />
      <div className="step-interest-center">
        <div className="step-interest-content">
          <button className="step-interest-prev-btn" onClick={prevStep}>
            <FiChevronLeft style={{ fontSize: "2.1rem" }} />
          </button>

          {/* 상단 진행 점:
              - 입력 전: 1개만 켜짐
              - 입력 후: 2개 켜짐 */}
          <div className="step-star-row">
            <Dot active /> 
            <Dot active={!!input.trim()} />
          </div>

          <h2
            className="step-title step-interest-title"
            style={{ marginTop: "2.5rem" }}
          >
            누구와 함께하는 여행인지 알려주세요
          </h2>

          <div
            className="step-desc step-interest-desc"
            style={{ marginBottom: "0" }}
          >
            당신만의 여행 요청을 입력하면, AI가 코스를 만들어드릴게요 ✨
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "8rem 0",
            }}
          >
            <img
              src={aicourse}
              alt="AI코스"
              style={{ width: "25rem", maxWidth: "70vw" }}
            />
          </div>

          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
              backgroundColor: "rgba(223, 246, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "1rem",
              borderRadius: "1.5rem",
              height: "5rem",
            }}
          >
            <input
              className="step-ai-input"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                color: "#fff",
                outline: "none",
                background: "transparent",
                padding: "0 2rem",
              }}
              type="text"
              placeholder="예) 연인과 함께하는 여행"
              value={input}
              onChange={handleInputChange}
            />
          </div>

          <div className="step-btn-group step-interest-btn-group">
            <button
              className={`step-btn step-interest-btn-next${
                !input.trim() ? " disabled" : ""
              }`}
              onClick={handleNext}
              disabled={!input.trim()}
            >
              ✨ AI 추천코스 생성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepAi;